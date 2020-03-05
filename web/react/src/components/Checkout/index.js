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
                cep: "",
                rua: "",
                numero: 0,
                complemento: "",
                bairro: "",
                cidade: "",
                estado: "SP",
            },
            cliente: {
                enderecos: [
                    {
                        id: 1,
                        cep: "00000000",
                        rua: "Av. Paulista",
                        numero: 550,
                        complemento: "",
                        bairro: "Higienopolis",
                        cidade: "São Paulo".replace(" ", ""),
                        estado: "SP",
                    },
                    {
                        id: 2,
                        cep: "11111111",
                        rua: "Av. Pres. Costa e Silva",
                        numero: 550,
                        complemento: "Loja 1",
                        bairro: "Helena Maria",
                        cidade: "Osasco".replace(" ", ""),
                        estado: "SP",
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
        const { data: cidades } = await axios(`${this.LINK_ESTADO_CIDADE}/${estado}/cidades`);
        this.setState({
            cidades
        });
    }

    mostrarCidades = (evt) => {
        this.listarCidades(evt.target.value);
    }

    autoPreencher = (evt) => {
        if (evt.cep == null) {
            let end = this.state.cliente.enderecos.find(x => x.id.toString() === evt.target.value);
            let obj = {
                ...this.state,
                endereco: {
                    cep: end.cep,
                    rua: end.rua,
                    numero: end.numero,
                    complemento: end.complemento,
                    bairro: end.bairro,
                    cidade: end.cidade.replace(" ", ""),
                    estado: end.estado
                }
            }

            this.setState({ ...obj });
            this.listarCidades(this.state.endereco.estado);
        } 
    }

    editarCEP = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                cep: e.target.value
            }
        }
        this.setState({ ...obj })
    }

    editarRua = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                rua: e.target.value
            }
        }
        this.setState({ ...obj })
    }

    editarNumero = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                numero: e.target.value
            }
        }
        this.setState({ ...obj })
    }

    editarComplemento = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                complemento: e.target.value
            }
        }
        this.setState({ ...obj })
    }

    editarBairro = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                bairro: e.target.value
            }
        }
        this.setState({ ...obj })
    }

    editarCidade = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                cidade: e.target.value
            }
        }
        this.setState({ ...obj })
    }

    editarComplemento = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                complemento: e.target.value
            }
        }
        this.setState({ ...obj })
    }

    render() {
        return (
            <Container ref={this.test}>
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
                                <Input value={this.state.endereco.cep} ref={this.cep} type="text" name="cep" mask="99999-999" maskChar="0" id="cep" tag={InputMask} onChange={this.editarCEP} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="input-rua">Rua:</Label>
                                <Input value={this.state.endereco.rua} type="text" name="rua" id="rua" onChange={this.editarRua} />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="4">
                                        <Label for="numero">Numero:</Label>
                                        <Input value={this.state.endereco.numero} type="text" name="numero-casa" id="numero" onChange={this.editarNumero} />
                                    </Col>
                                    <Col xs="8">
                                        <Label for="input-numero-casa">Complemento:</Label>
                                        <Input value={this.state.endereco.complemento} type="text" name="complemento" id="complemento" onChange={this.editarComplemento} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="input-bairro">Bairro:</Label>
                                <Input value={this.state.endereco.bairro} type="text" id="bairro" name="bairro" onChange={this.editarBairro} />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="6">
                                        <Label for="estado">Estado:</Label>
                                        <Input value={this.state.endereco.estado} type="select" id="estado" name="estado" onChange={this.mostrarCidades && this.editarEstado}>
                                            {this.state.estados.map(estado => (<option value={estado.id}>{estado.estado}</option>))}
                                        </Input>
                                    </Col>
                                    <Col xs="6">
                                        <Label for="cidade">Cidade:</Label>
                                        <Input value={this.state.endereco.cidade} type="select" id="cidade" name="cidade" onChange={this.editarCidade}>
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
