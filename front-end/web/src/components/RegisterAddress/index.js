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
                aState: ""
            },
        }
       
    }

    componentDidMount() {
        if (!sessionStorage.getItem('client')) {
            this.props.history.push('/');
            return;
        }
        this.listStates();
        
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
                    address: {
                        aCep: address.data.cep,
                        aNumber: 0,
                        aStreet: address.data.logradouro,
                        aCitie: typeof (address.data.localidade) == "string" ? address.data.localidade.replace(" ", "") : "",
                        aState: address.data.uf,
                        aDistrict: address.data.bairro
                    }
                });
                this.setState({ erro: "" });
                this.listCities(address.data.uf);
            } catch (erro) {
                console.log(erro);
                this.setState({ erro: "Erro ao buscar o CEP" });
            }
        }
    }

    generateAddress = async (e) => {
        e.preventDefault();

        try {
        let { email } = JSON.parse(sessionStorage.getItem('client'));
        let { data: account } = await api.get("/client/email/" + email);
            let address = {
                street: this.state.address.aStreet,
                cep: this.state.address.aCep,
                district: this.state.address.aDistrict,
                number: this.state.address.aNumber,
                uf: this.state.address.aState,
                citie: this.state.address.aCitie,
                complement: this.state.address.aComplement,
                client: {
                    id: account.id
                }

            }
            await api.post("/address", address);
            this.props.history.push("/address");
        } catch (error){
            console.log(error)
        }
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
                                        <Input value={this.state.address.aCep} ref={this.cep} type="text" name="aCep" mask="99999-999" maskChar="" id="aCep" tag={InputMask} onChange={e => this.setState({ address: { ...this.state.address, aCep: e.target.value } })} onKeyUp={this.findAddress} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="input-street"><span className="text-danger">*</span>Rua:</Label>
                                        <Input value={this.state.address.aStreet} type="text" name="aStreet" id="aStreet" onChange={e => this.setState({ address: { ...this.state.address, aStreet: e.target.value } })} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs="4">
                                                <Label for="aNumber"><span className="text-danger">*</span>Numero:</Label>
                                                <Input value={this.state.address.aNumber} type="text" name="aNumber" id="aNumber" onChange={e => this.setState({ address: { ...this.state.address, aNumber: e.target.value } })} />
                                            </Col>
                                            <Col xs="8">
                                                <Label for="aComplement">Complemento:</Label>
                                                <Input value={this.state.address.aComplement} type="text" name="aComplement" id="aComplement" onChange={e => this.setState({ address: { ...this.state.address, aComplement: e.target.value } })} />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="input-district"><span className="text-danger">*</span>Bairro:</Label>
                                        <Input value={this.state.address.aDistrict} type="text" id="aDistrict" name="aDistrict" onChange={e => this.setState({ address: { ...this.state.address, aDistrict: e.target.value } })} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Label for="aState"><span className="text-danger">*</span>Estado:</Label>
                                                <Input value={this.state.address.aState} onChange={e => { this.setState({ ...this.state.address, aState: e.target.value }) }} type="select" id="aState" name="aState" >
                                                    {this.state.states.map(state => (<option value={state.id}>{state.estado}</option>))}
                                                </Input>
                                            </Col>
                                            <Col xs="6">
                                                <Label for="aCitie"><span className="text-danger">*</span>Cidade:</Label>
                                                <Input value={this.state.address.aCitie} onChange={e => { this.setState({ ...this.state.address, aCitie: e.target.value }) }} type="select" id="aCitie" name="aCitie" >
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