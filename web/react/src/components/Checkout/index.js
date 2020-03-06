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
            estados: [],
            cidades: [],
            endereco: {
                cep: "",
                rua: "",
                numero: 0,
                complemento: "",
                bairro: "",
                cidade: "",
                estado: "AC",
            },
            cliente: {
                cartao: {
                    titular: "",
                    numero: "",
                    cpf: "",
                    cvv: "",
                    data: ""
                },
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
        this.editarEstado(evt);
    }

    findAddress = async (evt) => {
        let cep = evt.target.value;
        if (cep.length === 9) {
            const { data: address } = await axios(`${this.API_VIA_CEP}${cep.replace("-", "")}/json`);
            this.setState({
                ...this.state,
                endereco: {
                    ...this.state.endereco,
                    rua: address.logradouro,
                    cidade: typeof (address.localidade) == "string" ? address.localidade.replace(" ", "") : "",
                    estado: address.uf,
                    bairro: address.bairro
                }
            });
            this.listarCidades(address.uf);
        }

    }

    autoPreencher = (evt) => {
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

    editarCEP = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                cep: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editarRua = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                rua: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editarNumero = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                numero: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editarComplemento = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                complemento: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editarBairro = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                bairro: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editarCidade = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                cidade: e.target.value
            }
        }
        this.setState({ ...obj });
    }


    editarEstado = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                estado: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editarComplemento = (e) => {
        let obj = {
            ...this.state,
            endereco: {
                ...this.state.endereco,
                complemento: e.target.value
            }
        }
        this.setState({ ...obj });
    }

    editarCartaoTitular = (e) => {
        let obj = {
            ...this.state,
            cliente: {
                ...this.state.cliente,
                cartao: {
                    ...this.state.cliente.cartao,
                    titular: e.target.value
                }
            },
        }
        this.setState({ ...obj });
    }

    editarCartaoNumero = (e) => {
        let obj = {
            ...this.state,
            cliente: {
                ...this.state.cliente,
                cartao: {
                    ...this.state.cliente.cartao,
                    numero: e.target.value
                }
            },
        }
        this.setState({ ...obj });
    }

    editarCartaoCvv = (e) => {
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

    editarCartaoData = (e) => {
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

    editarCartaoCpf = (e) => {
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
        console.log("passei")
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
                            {(this.state.cliente.enderecos.length > 0) && (
                                <FormGroup>
                                    <Input type="select" id="input-enderecos" name="input-enderecos" onChange={this.autoPreencher}>
                                        <option value="0" disabled selected>Enderecos cadastrados</option>
                                        {this.state.cliente.enderecos.map(end => (<option value={end.id}>{`${end.rua}, ${end.numero}`}</option>))}
                                    </Input>
                                </FormGroup>
                            )}
                            <FormGroup>
                                <Label for="cep"><span className="text-danger">*</span>Cep:</Label>
                                <Input value={this.state.endereco.cep} ref={this.cep} type="text" name="cep" mask="99999-999" maskChar="" id="cep" tag={InputMask} onChange={this.editarCEP} onKeyUp={this.findAddress} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="input-rua"><span className="text-danger">*</span>Rua:</Label>
                                <Input value={this.state.endereco.rua} type="text" name="rua" id="rua" onChange={this.editarRua} />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="4">
                                        <Label for="numero"><span className="text-danger">*</span>Numero:</Label>
                                        <Input value={this.state.endereco.numero} type="text" name="numero-casa" id="numero" onChange={this.editarNumero} />
                                    </Col>
                                    <Col xs="8">
                                        <Label for="input-numero-casa">Complemento:</Label>
                                        <Input value={this.state.endereco.complemento} type="text" name="complemento" id="complemento" onChange={this.editarComplemento} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="input-bairro"><span className="text-danger">*</span>Bairro:</Label>
                                <Input value={this.state.endereco.bairro} type="text" id="bairro" name="bairro" onChange={this.editarBairro} />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="6">
                                        <Label for="estado"><span className="text-danger">*</span>Estado:</Label>

                                        <Input value={this.state.endereco.estado} type="select" id="estado" name="estado" onChange={this.mostrarCidades}>
                                            {this.state.estados.map(estado => (<option value={estado.id}>{estado.estado}</option>))}
                                        </Input>
                                    </Col>
                                    <Col xs="6">
                                        <Label for="cidade"><span className="text-danger">*</span>Cidade:</Label>
                                        <Input value={this.state.endereco.cidade} type="select" id="cidade" name="cidade" onChange={this.editarCidade}>
                                            {this.state.cidades.map(cidade => (<option value={cidade.cidade.replace(" ", "")}>{cidade.cidade}</option>))}
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <h5 className="bg-warning p-2 text-center">Pagamento</h5>
                            <FormGroup>
                                <Label for="cpf-cartao"><span className="text-danger">*</span>CPF Titular do cartão:</Label>
                                <Input value={this.state.cliente.cartao.cpf} type="text" name="cpf-cartao" id="cpf-cartao" mask="999.999.999-99" tag={InputMask} maskChar="0" onChange={this.editarCartaoCpf} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="nome-cartao"><span className="text-danger">*</span>Titular do cartao:</Label>
                                <Input value={this.state.cliente.cartao.titular} type="text" id="nome-cartao" name="nome-cartao" onChange={this.editarCartaoTitular} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="numero-cartao"><span className="text-danger">*</span>Numero do cartão:</Label>
                                <Input value={this.state.cliente.cartao.numero} type="text" name="numero-cartao" id="numero-cartao" mask="9999 9999 9999 9999" tag={InputMask} maskChar="0" onChange={this.editarCartaoNumero} />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="6">
                                        <Label for="data-cartao"><span className="text-danger">*</span>Data de validade:</Label>
                                        <Input value={this.state.cliente.cartao.data} type="text" name="data-cartao" id="data-cartao" mask="99/9999" tag={InputMask} maskChar="0" onChange={this.editarCartaoData} />
                                    </Col>
                                    <Col xs="6">
                                        <Label for="cvv-cartao"><span className="text-danger">*</span>CVV:</Label>
                                        <Input value={this.state.cliente.cartao.cvv} type="text" name="cvv-cartao" id="cvv-cartao" mask="999" tag={InputMask} onChange={this.editarCartaoCvv} />
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
