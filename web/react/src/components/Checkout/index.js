import React, { Component } from 'react';
import axios from 'axios';

import {
    Container,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Form,
    Button
} from 'reactstrap';

import InputMask from 'react-input-mask';

export default class Checkout extends Component {

    constructor() {
        super();
        this.API_VIA_CEP = "http://viacep.com.br/ws/";
        this.cep = React.createRef();
        this.LINK_ESTADO_CIDADE = "https://br-cidade-estado-nodejs.glitch.me/estados";
        this.state = {
            erro: "",
            states: [],
            cities: [],
            address: {
                cep: "",
                street: "",
                number: 0,
                complement: "",
                district: "",
                citie: "",
                state: "",
            },
            cliente: {
                cartao: {
                    holder: "",
                    number: "",
                    cpf: "",
                    cvv: "",
                    data: ""
                },
                addresses: [
                    {
                        id: 1,
                        cep: "00000000",
                        street: "Av. Paulista",
                        number: 550,
                        complement: "",
                        district: "Higienópolis",
                        citie: "São Paulo",
                        state: "SP",
                    },
                    {
                        id: 2,
                        cep: "11111111",
                        street: "Av. Pres. Costa e Silva",
                        number: 550,
                        complement: "Loja 1",
                        district: "Helena Maria",
                        citie: "Osasco",
                        state: "SP",
                    }
                ]
            }
        }
        this.listStates();
        this.listCities("AC");
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
        console.log(cities)
    }

    showCities = (evt) => {
        this.listCities(evt.target.value);
        this.editState(evt);
    }

    findAddress = async (evt) => {
        let cep = evt.target.value;
        if (cep.length === 9) {
            const { data: address } = await axios(`${this.API_VIA_CEP}${cep.replace("-", "")}/json`);
            this.setState({
                ...this.state,
                address: {
                    ...this.state.address,
                    street: address.logradouro,
                    citie: typeof (address.localidade) == "string" ? address.localidade.replace(" ", "") : "",
                    state: address.uf,
                    district: address.bairro
                }
            });
            this.listCities(address.uf);
        }

    }

    autoFill = (evt) => {
        let end = this.state.cliente.addresses.find(x => x.id.toString() === evt.target.value);
        let obj = {
            ...this.state,
            address: {
                cep: end.cep,
                street: end.street,
                number: end.number,
                complement: end.complement,
                district: end.district,
                citie: end.citie.replace(" ", ""),
                state: end.state
            }
        }

        this.setState({ ...obj });
        this.listCities(obj.address.state);

    }

    editCEP = (e) => {
        let obj = {
            ...this.state,
            address: {
                ...this.state.address,
                cep: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editStreet = (e) => {
        let obj = {
            ...this.state,
            address: {
                ...this.state.address,
                street: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editNumber = (e) => {
        let obj = {
            ...this.state,
            address: {
                ...this.state.address,
                number: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editComplement = (e) => {
        let obj = {
            ...this.state,
            address: {
                ...this.state.address,
                complement: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editDistrict = (e) => {
        let obj = {
            ...this.state,
            address: {
                ...this.state.address,
                district: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editCities = (e) => {
        let obj = {
            ...this.state,
            address: {
                ...this.state.address,
                citie: e.target.value
            }
        }
        this.setState({ ...obj });
    }


    editState = (e) => {
        let obj = {
            ...this.state,
            address: {
                ...this.state.address,
                state: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editComplement = (e) => {
        let obj = {
            ...this.state,
            address: {
                ...this.state.address,
                complement: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editCardHolder = (e) => {
        let obj = {
            ...this.state,
            cliente: {
                ...this.state.cliente,
                cartao: {
                    ...this.state.cliente.cartao,
                    holder: e.target.value
                }
            },
        }
        this.setState({ ...obj });
    }

    editCardNumber = (e) => {
        let obj = {
            ...this.state,
            cliente: {
                ...this.state.cliente,
                cartao: {
                    ...this.state.cliente.cartao,
                    number: e.target.value
                }
            },
        }
        this.setState({ ...obj });
    }

    editCardCVV = (e) => {
        let obj = {
            ...this.state,
            cliente: {
                ...this.state.cliente,
                cartao: {
                    ...this.state.cliente.cartao,
                    cvv: e.target.value
                }
            },
        }
        this.setState({ ...obj });
    }

    editCardDate = (e) => {
        let obj = {
            ...this.state,
            cliente: {
                ...this.state.cliente,
                cartao: {
                    ...this.state.cliente.cartao,
                    data: e.target.value
                }
            },
        }
        this.setState({ ...obj });
    }

    editCardCPF = (e) => {
        let obj = {
            ...this.state,
            cliente: {
                ...this.state.cliente,
                cartao: {
                    ...this.state.cliente.cartao,
                    cpf: e.target.value
                }
            },
        }
        this.setState({ ...obj });
    }

    finish = (evt) => {
        evt.preventDefault();
        if (!this.testCPF(this.state.cliente.cartao.cpf)) {
            this.setState({ erro: "CPF Invalido!" });
            return;
        }
        this.setState({ erro: "" });
    }

    testCPF = (strCPF) => {
        let soma;
        let resto;
        let cpf = ""

        for (let i = 0; i < strCPF.length; i++) {
            let char = strCPF.substring(i, i + 1);
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
            <Container ref={this.test}>
                <Form onSubmit={this.finish}>
                    <Row>
                        <Col md="4">
                            <h5 className="bg-warning p-2 text-center">Resumo</h5>

                        </Col>
                        <Col md="4">
                            <h5 className="bg-warning p-2 text-center">Entrega</h5>
                            {(this.state.cliente.addresses.length > 0) && (
                                <FormGroup>
                                    <Input type="select" id="input-addresses" name="input-addresses" onChange={this.autoFill}>
                                        <option value="0" disabled selected>Enderecos cadastrados</option>
                                        {this.state.cliente.addresses.map(end => (<option value={end.id}>{`${end.street}, ${end.number}`}</option>))}
                                    </Input>
                                </FormGroup>
                            )}
                            <FormGroup>
                                <Label for="cep"><span className="text-danger">*</span>Cep:</Label>
                                <Input value={this.state.address.cep} ref={this.cep} type="text" name="cep" mask="99999-999" maskChar="" id="cep" tag={InputMask} onChange={this.editCEP} onKeyUp={this.findAddress} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="input-street"><span className="text-danger">*</span>Rua:</Label>
                                <Input value={this.state.address.street} type="text" name="street" id="street" onChange={this.editarstreet} />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="4">
                                        <Label for="number"><span className="text-danger">*</span>Numero:</Label>
                                        <Input value={this.state.address.number} type="text" name="number-casa" id="number" onChange={this.editNumber} />
                                    </Col>
                                    <Col xs="8">
                                        <Label for="input-number-casa">Complemento:</Label>
                                        <Input value={this.state.address.complement} type="text" name="complement" id="complement" onChange={this.editComplement} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="input-district"><span className="text-danger">*</span>Bairro:</Label>
                                <Input value={this.state.address.district} type="text" id="district" name="district" onChange={this.editDistrict} />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="6">
                                        <Label for="state"><span className="text-danger">*</span>Estado:</Label>

                                        <Input value={this.state.address.state} type="select" id="state" name="state" onChange={this.showCities}>
                                            {this.state.states.map(state => (<option value={state.id}>{state.estado}</option>))}
                                        </Input>
                                    </Col>
                                    <Col xs="6">
                                        <Label for="citie"><span className="text-danger">*</span>Cidade:</Label>
                                        <Input value={this.state.address.citie} type="select" id="citie" name="citie" onChange={this.editCities}>
                                            {this.state.cities.map(citie => (<option value={citie.cidade}>{citie.cidade}</option>))}
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <h5 className="bg-warning p-2 text-center">Pagamento</h5>
                            <FormGroup>
                                <Label for="cpf-cartao"><span className="text-danger">*</span>CPF Titular do cartão:</Label>
                                <Input value={this.state.cliente.cartao.cpf} type="text" name="cpf-cartao" id="cpf-cartao" mask="999.999.999-99" tag={InputMask} maskChar="0" onChange={this.editCardCPF} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="nome-cartao"><span className="text-danger">*</span>Titular do cartao:</Label>
                                <Input value={this.state.cliente.cartao.holder} type="text" id="nome-cartao" name="nome-cartao" onChange={this.editCardHolder} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="number-cartao"><span className="text-danger">*</span>Numero do cartão:</Label>
                                <Input value={this.state.cliente.cartao.number} type="text" name="number-cartao" id="number-cartao" mask="9999 9999 9999 9999" tag={InputMask} maskChar="0" onChange={this.editCardNumber} />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="6">
                                        <Label for="data-cartao"><span className="text-danger">*</span>Data de validade:</Label>
                                        <Input value={this.state.cliente.cartao.data} type="text" name="data-cartao" id="data-cartao" mask="99/9999" tag={InputMask} maskChar="0" onChange={this.editCardDate} />
                                    </Col>
                                    <Col xs="6">
                                        <Label for="cvv-cartao"><span className="text-danger">*</span>CVV:</Label>
                                        <Input value={this.state.cliente.cartao.cvv} type="text" name="cvv-cartao" id="cvv-cartao" mask="999" tag={InputMask} onChange={this.editCardCVV} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <span className="text-danger">{this.state.erro}</span>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit">Finalizar compra</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Container >
        );
    }
}
