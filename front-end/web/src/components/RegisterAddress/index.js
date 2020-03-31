import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import InputMask from 'react-input-mask';
import { Container, Form, Row, Col, FormGroup, Input, Label, Button, Card } from 'reactstrap';
import api from '../../services/api';
import axios from 'axios';

class RegisterAddress extends Component {
    constructor(props) {
        super(props);
        this.API_VIA_CEP = "http://viacep.com.br/ws/";
        this.cep = React.createRef();
        this.LINK_ESTADO_CIDADE = "https://br-cidade-estado-nodejs.glitch.me/estados";
        this.state = {
            erro: "",
            states: [],
            cities: [],
            address: {
                aCep: "",
                aStreet: "",
                aNumber: 0,
                aComplement: "",
                aDistrict: "",
                aCitie: "",
                aState: "",
                client: {
                    id: ""
                }
            },
        }
        console.log(this.state)
        if (!sessionStorage.getItem('client')) {
            this.props.history.push('/');
            return;
        }
        this.listStates();
    }

    componentDidMount() {
        this.listStates();
        this.listCities("AC");
    }


    listStates = async () => {
        try {
            const { data: states } = await api.get(this.LINK_ESTADO_CIDADE);
            this.setState({ states });
        }
        catch{
            return;
        }
    }

    listCities = async (state) => {
        try {
            const { data: cities } = await axios.get(`${this.LINK_ESTADO_CIDADE}/${state}/cidades`);
            this.setState({
                cities
            });
        } catch{
            return;
        }
    }

    showCities = (evt) => {
        this.listCities(evt.target.value);
    }

    findAddress = async (evt) => {
        let cep = evt.target.value;
        if (cep.length === 9) {
            try {
                const address = await axios.get(`${this.API_VIA_CEP}${cep.replace("-", "")}/json`);
                if (address.data.erro) {
                    this.setState({ erro: "Erro ao buscar o CEP" });
                    return;
                }
                this.setState({
                    ...this.state,
                    address: {
                        ...this.state.address,
                        aCep: address.data.cep,
                        aStreet: address.data.logradouro,
                        aCitie: typeof (address.data.localidade) == "string" ? address.data.localidade.replace(" ", "") : "",
                        aState: address.data.uf,
                        aDistrict: address.data.bairro
                    }
                });
                console.log(this.state)
                this.setState({ erro: "" });
                this.listCities(address.data.uf);
            } catch (erro) {
                console.log(erro);
                this.setState({ erro: "Erro ao buscar o CEP" });
            }
        }
    }

    autoFill = (evt) => {
        let end = this.state.client.addresses.find(x => x.id.toString() === evt.target.value);
        if (!end) {
            let obj = {
                ...this.state,
                address: {
                    id: 0
                }
            }
            this.setState({ obj });
            return;
        }
        let obj = {
            ...this.state,
            address: {
                id: end.id,
                aCep: end.cep,
                aStreet: end.street,
                aNumber: end.number,
                aComplement: end.complement,
                aDistrict: end.district,
                aCitie: end.citie,
                aState: end.uf
            }
        }

        this.setState({ ...obj });
        this.listCities(end.uf);

    }

    generateAddress = async (e) => {
        e.preventDefault();
        
        let address = {
            street: this.state.aStreet,
            cep: this.state.aCep,
            district: this.state.aDistrict,
            number: this.state.aNumber,
            uf: this.state.aState,
            citie: this.state.aCitie,
            complement: this.state.aComplement,
            client: {
               id: this.state.client
            }
            
        } 
        console.log(this.state)
        console.log(address)
        await api.post("/address", address);
    }


    render() {
        return (
            <>
                <Header />
                <Container >
                    <Form onSubmit={this.generateAddress}>
                        <Row>
                            <Col md="4"></Col>
                            <Col md="4">
                                <Card className="p-2">
                                <h5 className="bg-warning p-2 text-center">Cadastrar Endereço</h5>
                                <FormGroup>
                                    <Label for="cep"><span className="text-danger">*</span>Cep:</Label>
                                    <Input value={this.state.address.aCep} ref={this.cep} type="text" name="aCep" mask="99999-999" maskChar="" id="aCep" tag={InputMask} onChange={e => this.setState({ address: { aCep: e.target.value } })} onKeyUp={this.findAddress} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="input-street"><span className="text-danger">*</span>Rua:</Label>
                                    <Input value={this.state.address.aStreet} type="text" name="aStreet" id="aStreet" onChange={e => this.setState({ address: { aStreet: e.target.value } })} />
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs="4">
                                            <Label for="aNumber"><span className="text-danger">*</span>Numero:</Label>
                                            <Input value={this.state.address.aNumber} type="text" name="aNumber" id="aNumber" onChange={e => this.setState({ address: { aNumber: e.target.value } })} />
                                        </Col>
                                        <Col xs="8">
                                            <Label for="aComplement">Complemento:</Label>
                                            <Input value={this.state.address.aComplement} type="text" name="aComplement" id="aComplement" onChange={e => this.setState({ address: { aComplement: e.target.value } })} />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="input-district"><span className="text-danger">*</span>Bairro:</Label>
                                    <Input value={this.state.address.aDistrict} type="text" id="aDistrict" name="aDistrict" onChange={e => this.setState({ address: { aDistrict: e.target.value } })} />
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs="6">
                                            <Label for="aState"><span className="text-danger">*</span>Estado:</Label>
                                            <Input type="select" id="aState" name="aState" >
                                                {this.state.states.map(state => (<option value={state.id}>{state.estado}</option>))}
                                            </Input>
                                        </Col>
                                        <Col xs="6">
                                            <Label for="aCitie"><span className="text-danger">*</span>Cidade:</Label>
                                            <Input type="select" id="aCitie" name="aCitie" >
                                                {this.state.cities.map(citie => (<option value={citie.cidade}>{citie.cidade}</option>))}
                                            </Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup align="center">
                                    <Button color="success" type="submit"> Cadastrar </Button>
                                </FormGroup>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <Footer />
            </>
        )
    }
}

export default RegisterAddress;