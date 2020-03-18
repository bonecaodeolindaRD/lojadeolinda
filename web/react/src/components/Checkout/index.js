import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';
import { FaCheckCircle } from 'react-icons/fa';

import {
    Container,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Form,
    Button,
    Card,
    CardTitle
} from 'reactstrap';

import InputMask from 'react-input-mask';

import Header from '../Header';

export default class Checkout extends Component {

    constructor(props) {
        super(props);
        this.API_VIA_CEP = "http://viacep.com.br/ws/";
        this.cep = React.createRef();
        this.LINK_ESTADO_CIDADE = "https://br-cidade-estado-nodejs.glitch.me/estados";
        this.submeted = false;
        this.noStock = false;
        this.state = {
            erro: " ",
            states: [],
            cities: [],
            products: [],
            total: 0,
            address: {
                id: 1,
                aCep: "",
                aStreet: "",
                aNumber: 0,
                aComplement: "",
                aDistrict: "",
                aCitie: "",
                aState: "",
            },
            client: {
                card: {
                    cHolder: "",
                    cNumber: "",
                    cCPF: "",
                    cCVV: "",
                    cDate: ""
                },
                addresses: [
                    {
                        id: 1,
                        aCep: "00000000",
                        aStreet: "Av. Paulista",
                        aNumber: 550,
                        aComplement: "",
                        aDistrict: "Higienópolis",
                        aCitie: "São Paulo",
                        aState: "SP",
                    },
                    {
                        id: 2,
                        aCep: "11111111",
                        aStreet: "Av. Pres. Costa e Silva",
                        aNumber: 550,
                        aComplement: "Loja 1",
                        aDistrict: "Helena Maria",
                        aCitie: "Osasco",
                        aState: "SP",
                    }
                ],

            }

        }
        if(!sessionStorage.getItem('client')){
            this.props.history.push('/');
            return;
        }
        this.listStates();
        this.listCities("AC");
    }


    componentDidMount() {

        let totalCart = 0;

        let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

        for (var i in cart) {
            totalCart += cart[i].totalItem;
        }


        cart.forEach(async p => {
            let {data: response} = await axios("http://localhost:8080/ecommerce/stock/product/" + p.id + "/1");
            if(response.balance < p.quantity)
                this.noStock = true;
        });

        this.setState({ total: totalCart, products: cart });
    }

    gerateOrder = async () => {
        try {
            const email = JSON.parse(sessionStorage.getItem('client'));
            const { data: client } = await axios("http://localhost:8080/ecommerce/client/email/" + email.email);
            const address = {
                street: this.state.address.aStreet,
                cep: this.state.address.aCep,
                district: this.state.address.aDistrict,
                number: this.state.address.aNumber,
                uf: this.state.address.aState
            }
            let {data: returnAddress } = await axios.post("http://localhost:8080/ecommerce/address/new", address);
            if(!returnAddress){
                this.setState({ erro: "Erro ao gerar o pedido" });
                return false;
            }
            let obj = {
                date: new Date(),
                client: {
                    id: client.id
                },
                orderItem: [],
                status: {
                    idStatus: 1
                },
                address: {
                    id: returnAddress.id
                },
                shipping: 200
            }

            this.state.products.forEach(p => obj.orderItem.push({
                product: {
                    id: p.id
                },
                quantity: p.quantity,
                value: p.value
            }));
            let { data: order } = await axios.post("http://localhost:8080/ecommerce/order/new", obj);
            if(!order){
                this.setState({ erro: "Erro ao gerar o pedido" });
                return false;
            }
            sessionStorage.setItem('order', JSON.stringify(order));
            return true;
        } catch(eee){
            return false;
        }
    }

    listStates = async () => {
        const { data: states } = await axios(this.LINK_ESTADO_CIDADE);
        this.setState({ states });
    }

    listCities = async (state) => {
        const { data: cities } = await axios(`${this.LINK_ESTADO_CIDADE}/${state}/cidades`);
        this.setState({
            cities
        });
    }

    showCities = (evt) => {
        this.listCities(evt.target.value);
        this.editAddress(evt);
    }

    findAddress = async (evt) => {
        let cep = evt.target.value;
        if (cep.length === 9) {
            const { data: address } = await axios(`${this.API_VIA_CEP}${cep.replace("-", "")}/json`);

            this.setState({
                ...this.state,
                address: {
                    ...this.state.address,
                    aStreet: address.logradouro,
                    aCitie: typeof (address.localidade) == "string" ? address.localidade.replace(" ", "") : "",
                    aState: address.uf,
                    aDistrict: address.bairro
                }
            });
            this.listCities(address.uf);
        }

    }

    autoFill = (evt) => {
        let end = this.state.client.addresses.find(x => x.id.toString() === evt.target.value);
        let obj = {
            ...this.state,
            address: {
                aCep: end.aCep,
                aStreet: end.aStreet,
                aNumber: end.aNumber,
                aComplement: end.aComplement,
                aDistrict: end.aDistrict,
                aCitie: end.aCitie.replace(" ", ""),
                aState: end.aState
            }
        }

        this.setState({ ...obj });
        this.listCities(obj.address.aState);

    }

    editAddress = (evt) => {
        let obj = {
            ...this.state,
            address: {
                ...this.state.address,
                [evt.target.id]: evt.target.value
            }
        }
        this.setState({ ...obj });
    }

    editCard = (evt) => {
        let obj = {
            ...this.state,
            client: {
                ...this.state.client,
                card: {
                    ...this.state.client.card,
                    [evt.target.id]: evt.target.value
                }
            }
        }
        this.setState({ ...obj });
    }

    isEmpty = str => str.toString().trim().length <= 0;

    isName = (name) => {

        let re = /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ\-\\ \s]+$/;
        return !re.test(name);
          
    };

    validateDate = (str) => {
        let fields = str.split('/');
        let month = parseInt(fields[0]);
        let year = parseInt(fields[1]);
        if(month > 12)
            return false;
        let now = new Date();
        let cardDate = new Date(year, month);
        if(now > cardDate)
            return false;
        return true;
    }

    validateFields = () => {
        if (this.isEmpty(this.state.address.aCep)) {
            this.setState({ erro: "Digite o CEP!" });
            return false;
        }
        if (this.isEmpty(this.state.address.aStreet)) {
            this.setState({ erro: "Digite o nome da rua!" });
            return false;
        }
        if (this.isEmpty(this.state.address.aNumber)) {
            this.setState({ erro: "Digite o numero do local!" });
            return false;
        }
        if (this.isEmpty(this.state.address.aDistrict)) {
            this.setState({ erro: "Digite o bairro!" });
            return false;
        }
        if (!this.testCPF(this.state.client.card.cCPF)) {
            this.setState({ erro: "CPF Invalido!" });
            return false;
        }
        if (this.isEmpty(this.state.client.card.cCPF)) {
            this.setState({ erro: "Digite o CPF do titular do cartão!" });
            return false;
        }
        if (this.isEmpty(this.state.client.card.cHolder)) {
            this.setState({ erro: "Digite o nome do titular do cartão!" });
            return false;
        }
        if(this.isName(this.state.client.card.cHolder)){
            this.setState({erro: "O nome do titular não pode conter numeros ou caracteres especiais"});
            return false;
        }
        if (this.isEmpty(this.state.client.card.cNumber)) {
            this.setState({ erro: "Digite o numero do cartão!" });
            return false;
        }
        if (this.isEmpty(this.state.client.card.cDate)) {
            this.setState({ erro: "Digite a data de validade do cartão!" });
            return false;
        }
        if(!this.validateDate(this.state.client.card.cDate)){
            this.setState({ erro: "Data do cartão invalida" });
            return false;
        }

        if (this.isEmpty(this.state.client.card.cCVV)) {
            this.setState({ erro: "Digite o codigo de segurança do cartão!" });
            return false;
        }
        return true;
    }

  

    finish = async (evt) => {
        evt.preventDefault();
        if(this.submeted)
            return;

        if(this.noStock){
            this.setState({ erro: "Um ou mais produtos esta fora de estoque" });
            return;
        }
        if (!this.validateFields())
            return;
        if(this.gerateOrder() && !this.noStock){
            setTimeout(() => this.props.history.push("/success"), 2000);
            this.submeted = true;
        }
        else
            this.setState({ erro: "Erro ao gerar o pedido" });
    }

    testCPF = (CPF) => {
        let soma;
        let resto;
        let cpf = ""

        for (let i = 0; i < CPF.toString().length; i++) {
            let char = CPF.substring(i, i + 1);
            if (char !== "." && char !== "-")
                cpf += char;
        }
        soma = 0;
        if (cpf === "00000000000")
            return false;

        for (let i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;



        if ((resto === 10) || (resto === 11))
            resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10)))
            return false;



        soma = 0;
        for (let i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11))
            resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11)))
            return false;

        return true;
    }


    render() {
        return (
            <>
                <Header history={this.props.history} location={this.props.location}/>
                <Container ref={this.test}>
                    <Form onSubmit={this.finish}>
                        <Row>
                            <Col md="4">
                                <h5 className="bg-warning p-2 text-center">Resumo</h5>
                                <div className="resumo">
                                    {this.state.products.map(p => (
                                        <Card body className="mb-1">
                                            <Row>
                                                <Col xs="7">
                                                    <CardTitle>
                                                        {p.name}
                                                    </CardTitle>
                                                    <img src={p.image} alt={p.name} title={p.name} />
                                                </Col>
                                                <Col xs="5">
                                                    <p className="h6">R${(p.price).toFixed(2)}</p>
                                                    <p className="h6">Qtd: {p.quantity}</p>
                                                    <p className="h6">Subtotal: R${(p.totalItem).toFixed(2)}</p>
                                                </Col>
                                            </Row>
                                        </Card>
                                    ))
                                    }
                                </div>
                            </Col>

                            <Col md="4">
                                <h5 className="bg-warning p-2 text-center">Entrega</h5>
                                <FormGroup>
                                    <Label for="cep"><span className="text-danger">*</span>Cep:</Label>
                                    <Input value={this.state.address.aCep} ref={this.cep} type="text" name="aCep" mask="99999-999" maskChar="" id="aCep" tag={InputMask} onChange={this.editAddress} onKeyUp={this.findAddress} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="input-street"><span className="text-danger">*</span>Rua:</Label>
                                    <Input value={this.state.address.aStreet} type="text" name="aStreet" id="aStreet" onChange={this.editAddress} />
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs="4">
                                            <Label for="aNumber"><span className="text-danger">*</span>Numero:</Label>
                                            <Input value={this.state.address.aNumber} type="text" name="aNumber" id="aNumber" onChange={this.editAddress} />
                                        </Col>
                                        <Col xs="8">
                                            <Label for="aComplement">Complemento:</Label>
                                            <Input value={this.state.address.aComplement} type="text" name="aComplement" id="aComplement" onChange={this.editAddress} />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="input-district"><span className="text-danger">*</span>Bairro:</Label>
                                    <Input value={this.state.address.aDistrict} type="text" id="aDistrict" name="aDistrict" onChange={this.editAddress} />
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs="6">
                                            <Label for="aState"><span className="text-danger">*</span>Estado:</Label>

                                            <Input value={this.state.address.aState} type="select" id="aState" name="aState" onChange={this.showCities}>
                                                {this.state.states.map(state => (<option value={state.id}>{state.estado}</option>))}
                                            </Input>
                                        </Col>
                                        <Col xs="6">
                                            <Label for="aCitie"><span className="text-danger">*</span>Cidade:</Label>
                                            <Input value={this.state.address.aCitie} type="select" id="aCitie" name="aCitie" onChange={this.editAddress}>
                                                {this.state.cities.map(citie => (<option value={citie.cidade}>{citie.cidade}</option>))}
                                            </Input>
                                        </Col>
                                    </Row>
                                </FormGroup>

                                <FormGroup>
                                    <h6>Receba em até 10 dias úteis</h6>
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <h5 className="bg-warning p-2 text-center">Pagamento</h5>

                                <FormGroup>
                                    <h6>Frete: R$200.00</h6>
                                    <h6>Total: R${(this.state.total + 200.00).toFixed(2)}</h6>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="cCPF"><span className="text-danger">*</span>CPF Titular do cartão:</Label>
                                    <Input value={this.state.client.card.cCPF} type="text" name="cCPF" id="cCPF" mask="999.999.999-99" tag={InputMask} maskChar="0" onChange={this.editCard} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cHolder"><span className="text-danger">*</span>Titular do cartão:</Label>
                                    <Input value={this.state.client.card.cHolder} type="text" id="cHolder" name="cHolder" onChange={this.editCard} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cNumber"><span className="text-danger">*</span>Numero do cartão:</Label>
                                    <Input value={this.state.client.card.cNumber} type="text" name="cNumber" id="cNumber" mask="9999 9999 9999 9999" tag={InputMask} maskChar="0" onChange={this.editCard} />
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs="6">
                                            <Label for="cDate"><span className="text-danger">*</span>Data de validade:</Label>
                                            <Input value={this.state.client.card.cDate} type="text" name="cDate" id="cDate" mask="99/9999" tag={InputMask} maskChar="0" onChange={this.editCard} />
                                        </Col>
                                        <Col xs="6">
                                            <Label for="cCVV"><span className="text-danger">*</span>CVV:</Label>
                                            <Input value={this.state.client.card.cCVV} type="text" name="cCVV" id="cCVV" mask="999" tag={InputMask} onChange={this.editCard} />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <span className="text-danger">{this.state.erro}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Button color="success" type="submit"><FaCheckCircle /> Finalizar Compra</Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Container >
            </>
        );
    }
}
