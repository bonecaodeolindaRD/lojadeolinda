import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import InputMask from 'react-input-mask';
import { Container, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

class RegisterAddress extends Component {
    constructor(props) {
        super(props);
        this.API_VIA_CEP = "http://viacep.com.br/ws/";
        this.state = {
            loading: false,
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
            }
        }
    }

    findAddress = async (evt) => {
        let cep = evt.target.value;
        if (cep.length === 9) {
            try {
                const address = await axios(`${this.API_VIA_CEP}${cep.replace("-", "")}/json`);
                if (address.data.erro) {
                    this.setState({ erro: "Erro ao buscar o CEP" });
                    return;
                }
                this.setState({
                    ...this.state,
                    address: {
                        ...this.state.address,
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
        return true;
    }

    finish = async (evt) => {
        evt.preventDefault();
        if (!this.validateFields()) {
            this.setState({ loading: false });
            return;
        }
    }

    render() {
        return (
            <>
                <Header />
                <Container align="center">
                    <Form>
                        <Row>
                            <Col md="4">
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