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
        this.cep = React.createRef();
        this.LINK_ESTADO_CIDADE = "https://br-cidade-estado-nodejs.glitch.me/estados";
        this.state = {
            estados: [],
            cidades: [],
            endereco: {
                cep: "00000-000"
            },
            cliente: {
                enderecos: [
                    {
                        id: 1,
                        cep: "00000000",
                        rua: "Av. Paulista",
                        numero: 550,
                        bairro: "Higienopolis",
                        cidade: "São Paulo",
                        estado: "SP",
                        complemento: ""
                    },
                    {
                        id: 2,
                        cep: "11111111",
                        rua: "Av. Paulista",
                        numero: 550,
                        bairro: "Higienopolis",
                        cidade: "São Paulo",
                        estado: "SP",
                        complemento: "Andar 8"
                    }
                ]
            }
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
        console.log(evt.target);
        this.listarCidades(evt.target.value);
    }

    autoPreencher = (evt) => {
        if(evt.cep == null)
        {
            let end = this.state.cliente.enderecos.find(x => x.id.toString() === evt.target.value);
            this.setState({endereco: end});
            //inputCep.value = end.cep;
        }
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
                            {(this.state.cliente.enderecos.length > 0) && (
                                <FormGroup>
                                    <Input type="select" id="input-enderecos" name="input-enderecos" onChange={this.autoPreencher}>
                                        <option value="0" disabled selected>Enderecos cadastrados</option>
                                        {this.state.cliente.enderecos.map(end => (<option value={end.id}>{`${end.rua}, ${end.numero}`}</option>))}
                                    </Input>
                                </FormGroup>
                            )}
                            <FormGroup>
                                <Label for="cep">Cep:</Label>
                                <Input type="text" name="cep" mask="99999-999" maskChar="0" id="cep" tag={InputMask}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="input-rua">Rua:</Label>
                                <Input type="text" name="rua" id="rua" />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="4">
                                        <Label for="numero">Numero:</Label>
                                        <Input type="text" name="numero-casa" id="numero" />
                                    </Col>
                                    <Col xs="8">
                                        <Label for="input-numero-casa">Complemento:</Label>
                                        <Input type="text" name="complemento" id="complemento" />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="input-bairro">Bairro:</Label>
                                <Input type="text" id="bairro" name="bairro" />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="6">
                                        <Label for="estado">Estado:</Label>
                                        <Input type="select" id="estado" name="estado" onChange={this.mostrarCidades}>
                                            {this.state.estados.map(estado => (<option value={estado.id}>{estado.estado}</option>))}
                                        </Input>
                                    </Col>
                                    <Col xs="6">
                                        <Label for="cidade">Cidade:</Label>
                                        <Input type="select" id="cidade" name="cidade">
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
