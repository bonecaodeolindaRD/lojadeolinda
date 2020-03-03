import React, { Component } from 'react';
import axios from 'axios';

import {
    Container,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Form
} from 'reactstrap';

import InputMask from 'react-input-mask';

export default class Checkout extends Component {

    constructor() {
        super();
        this.LINK_ESTADO_CIDADE = "https://br-cidade-estado-nodejs.glitch.me/estados";
        this.state = {
            estados: [],
            cidades: []
        }
        this.listarEstados();
        this.listarCidades("AC");
    }

    listarEstados = async () => {
        const { data: estados } = await axios(this.LINK_ESTADO_CIDADE);
        this.setState({ estados });
    }

    listarCidades = async (estado) => {
        const { data : cidades } = await axios(`${this.LINK_ESTADO_CIDADE}/${estado}/cidades`);
        this.setState({ cidades });
    }

    mostrarCidades = (evt) => {
        this.listarCidades(evt.target.value);
    }

    render() {
        return (
            <Container>
                <Form>
                    <Row>
                        <Col md="4">
                            <h5 className="bg-warning p-2 text-center">Resumo</h5>

                        </Col>
                        <Col md="4">
                            <h5 className="bg-warning p-2 text-center">Entrega</h5>
                            <FormGroup>
                                <Label for="input-cep">Cep:</Label>
                                <Input type="text" name="input-cep" mask="99999-999" maskChar=" " id="input-cep" tag={InputMask} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="input-rua">Rua:</Label>
                                <Input type="text" name="input-rua" id="input-rua" />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="4">
                                        <Label for="input-numero-casa">Numero:</Label>
                                        <Input type="text" name="input-numero-casa" id="input-numero-casa" />
                                    </Col>
                                    <Col xs="8">
                                        <Label for="input-numero-casa">Complemento:</Label>
                                        <Input type="text" name="input-complemento-casa" id="input-complemento-casa" />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="input-bairro">Bairro:</Label>
                                <Input type="text" id="input-bairro" name="input-bairro" />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="6">
                                        <Label for="input-estado">Estado:</Label>
                                        <Input type="select" id="input-estado" name="input-estado" onChange={this.mostrarCidades}>
                                            {this.state.estados.map(estado => (<option value={estado.id}>{estado.estado}</option>))}
                                        </Input>
                                    </Col>
                                    <Col xs="6">
                                        <Label for="input-cidade">Cidade:</Label>
                                        <Input type="select" id="input-cidade" name="input-cidade">
                                            {this.state.cidades.map(cidade => (<option value={cidade.cidade.replace(" ", "")}>{cidade.cidade}</option>))}
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <h5 className="bg-warning p-2 text-center">Pagamento</h5>
                        </Col>
                    </Row>
                </Form>
            </Container >
        );
    }
}
