import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import InputMask from 'react-input-mask';
import { Container, Form, Row, Col, FormGroup, Input, Label, Button } from 'reactstrap';
import axios from 'axios';

class RegisterAddress extends Component {


    render() {
        return (
            <>
                <Header />
                <Container>
                    <Form>
                        <Row>
                            <Col md="4"></Col>
                            <Col md="4">
                                <h5 className="bg-warning p-2 text-center">Cadastrar Endereço</h5>
                                <FormGroup>
                                    <Label for="cep"><span className="text-danger">*</span>Cep:</Label>
                                    <Input type="text" name="aCep" mask="99999-999" maskChar="" id="aCep" tag={InputMask} onChange={this.editAddress} onKeyUp={this.findAddress} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="input-street"><span className="text-danger">*</span>Rua:</Label>
                                    <Input type="text" name="aStreet" id="aStreet" />
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs="4">
                                            <Label for="aNumber"><span className="text-danger">*</span>Numero:</Label>
                                            <Input type="text" name="aNumber" id="aNumber" />
                                        </Col>
                                        <Col xs="8">
                                            <Label for="aComplement">Complemento:</Label>
                                            <Input type="text" name="aComplement" id="aComplement" />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="input-district"><span className="text-danger">*</span>Bairro:</Label>
                                    <Input type="text" id="aDistrict" name="aDistrict" />
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs="6">
                                            <Label for="aState"><span className="text-danger">*</span>Estado:</Label>

                                            <Input type="select" id="aState" name="aState" >
                                                {/* {this.state.states.map(state => (<option value={state.id}>{state.estado}</option>))} */}
                                            </Input>
                                        </Col>
                                        <Col xs="6">
                                            <Label for="aCitie"><span className="text-danger">*</span>Cidade:</Label>
                                            <Input type="select" id="aCitie" name="aCitie" >
                                                {/* {this.state.cities.map(citie => (<option value={citie.cidade}>{citie.cidade}</option>))} */}
                                            </Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <div className="justify-content-center">
                                        <Button color="success" type="submit"> Cadastrar </Button>
                                    </div>
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