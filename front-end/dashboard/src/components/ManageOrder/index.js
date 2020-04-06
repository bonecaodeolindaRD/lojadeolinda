import React, { Component } from 'react';
import api from '../../services/api';


import Header from '../Header';
import { Container, InputGroup, Label, Input, FormGroup, Col, Row, Button, Card, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';


export default class ManageOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {
                status: {
                    idStatus: 0
                }
            },
            erro: "",
            statusList: [],
            isOpen: false,
            isOpenAprove: false
        }
        if (this.props.match.params.id > 0)
            this.findOrder(this.props.match.params.id);
        this.existentUser();
        this.findStatus();
    }

    existentUser = async () => {
        try {
            let { username } = JSON.parse(sessionStorage.getItem('user'));
            let user = await api.get("/employee/" + username);
            if (!user) {
                sessionStorage.removeItem('dG9rZW4=');
                sessionStorage.removeItem('user');
                this.props.history.push("/");
            }
        } catch{
            this.props.history.push("/");
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('dG9rZW4=');
        }
    }

    cancelOrder = async (evt) => {
        evt.preventDefault();
        try {
            let order = await api.post("/order/cancel/" + this.props.match.params.id);
            if (!order.data) {
                this.setState({ erro: "Erro ao editar o pedido" });
                return;
            }
            this.findOrder(this.props.match.params.id);
            this.setState({ erro: "Pedido cancelado com sucesso" });
        } catch{
            this.setState({ erro: "Erro ao editar o pedido" });
        }
    }

    aproveOrder = async (evt) => {
        evt.preventDefault();
        try {
            let order = await api.post("/order/aprove/" + this.props.match.params.id);
            if (!order.data) {
                this.setState({ erro: "Erro ao editar o pedido" });
                return;
            }
            this.findOrder(this.props.match.params.id);
            this.setState({ erro: "Pedido aprovado com sucesso" });
        } catch{
            this.setState({ erro: "Erro ao editar o pedido" });
        }
    }

    findStatus = async (evt) => {
        try {
            let statusList = await api.get("/status");
            if (!statusList.data) {
                return;
            }
            this.setState({ statusList: statusList.data });
        } catch{
            this.setState({ erro: "Erro ao achar os status" });
        }
    }

    findOrder = async (id) => {
        try {
            let order = await api.get("/order/" + id);
            console.log(order.data);
            if (!order.data) {
                this.setState({ erro: "Erro ao achar o pedido" });
                return;
            }
            this.setState({ order: order.data });
        } catch{
            this.setState({ erro: "Erro ao achar o pedido" });
        }
    }

    toggleModalCancel = (evt) => {
        evt.preventDefault();
        if (this.state.order.status.idStatus === 6) {
            this.setState({ erro: "O pedido já se contra cancelado" });
            return;
        }
        this.setState({ isOpen: !this.state.isOpen });
    }

    toggleModalAprove = (evt) => {
        evt.preventDefault();
        if (this.state.order.status.idStatus === 3) {
            this.setState({ erro: "O pedido já se contra aprovado" });
            return;
        }
        if (this.state.order.status.idStatus === 6) {
            this.setState({ erro: "O pedido se contra cancelado, não é possivel aprova-lo" });
            return;
        }
        this.setState({ isOpenAprove: !this.state.isOpenAprove });
    }

    phoneFormat = (phone) => {
        let part0 = phone.substring(0, 2);
        let part1 = phone.substring(2, 7);
        let part2 = phone.substring(7, 11);
        return `(${part0}) ${part1}-${part2}`;
    }

    render() {
        return (
            <>
                <Header />
                <Container className="mt-5">
                    {this.state.order.id > 0 ? (
                        <>
                            <div className="border p-2">
                                <FormGroup className="bg-warning rounded font-weight-bold text-center p-2">
                                    <Label>Pedido</Label>
                                    <p className="text-danger">{this.state.erro}</p>
                                </FormGroup>
                                <Row>
                                    <Col xs={2}>
                                        <Label for="ordernumber">Numero do pedido:</Label>
                                        <InputGroup>
                                            <h4>{this.state.order.id}</h4>
                                        </InputGroup>
                                    </Col>
                                    <Col xs={2}>
                                        <Label for="value">
                                            Valor do pedido:
                                        </Label>
                                        <h4>{this.state.order.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                                    </Col>
                                    <Col xs={2}>
                                        <FormGroup>
                                            <Label for="orderstatus">Status</Label>
                                            <Input disabled type="select" id="orderstatus" name="orderstatus" value={this.state.order.status.status} onChange={e => this.setState({ order: { ...this.state.order, status: { idStatus: e.target.value } } })}>
                                                <option value="0">-</option>
                                                {this.state.statusList.map(s => (
                                                    <option value={s.status}>{s.status}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={3}>
                                        <FormGroup>
                                            <Label for="orderdate">Data:</Label>
                                            <Input type="date" id="orderdate" name="orderdate" value={this.state.order.date} disabled />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={3}>
                                        <Row>
                                            <Col xs={6}>
                                                <FormGroup>
                                                    <Label for="order-aprove"> </Label>
                                                    <Button color="success" onClick={this.toggleModalAprove} type="button" id="order-aprove" className="form-control">Aprovar</Button>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={6}>
                                                <FormGroup>
                                                    <Label for="orderdate"> </Label>
                                                    <Button color="danger" onClick={this.toggleModalCancel} type="button" id="ordercancel" className="form-control">Cancelar</Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                {this.state.order.id ? (
                                    <>
                                        <FormGroup className="bg-warning rounded text-center font-weight-bold p-2 ">
                                            <Label>Cliente</Label>
                                        </FormGroup>

                                        <Table bordered className="table table-striped" style={{ marginTop: 20 }} >
                                            <thead>
                                                <th>CPF</th>
                                                <th>Nome</th>
                                                <th>Telefone</th>
                                                <th>Email</th>
                                            </thead>
                                            <tbody>
                                                {this.state.order.client ? (
                                                    <tr>
                                                        <td>
                                                            {this.state.order.client.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4')}
                                                        </td>
                                                        <td>
                                                            {this.state.order.client.name}
                                                        </td>
                                                        <td>
                                                            {this.state.order.client.phoneNumber.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3')}
                                                        </td>
                                                        <td>
                                                            {this.state.order.client.email}
                                                        </td>
                                                    </tr>) : (<> </>)
                                                }
                                            </tbody>
                                        </Table>
                                        <FormGroup className="bg-warning rounded text-center font-weight-bold p-2 ">
                                            <Label>Endereço</Label>
                                        </FormGroup>

                                        <Table bordered className="table table-striped" style={{ marginTop: 20 }} >
                                            <thead>
                                                <th>CEP</th>
                                                <th>Rua</th>
                                                <th>N</th>
                                                <th>Comp</th>
                                                <th>Cidade</th>
                                                <th>Bairro</th>
                                                <th>UF</th>
                                            </thead>
                                            <tbody>
                                                {this.state.order.address ? (
                                                    <tr>
                                                        <td>
                                                            {this.state.order.address.cep}
                                                        </td>
                                                        <td>
                                                            {this.state.order.address.street}
                                                        </td>
                                                        <td>
                                                            {this.state.order.address.number}
                                                        </td>
                                                        <td>
                                                            {this.state.order.address.complement}
                                                        </td>
                                                        <td>
                                                            {this.state.order.address.citie}
                                                        </td>
                                                        <td>
                                                            {this.state.order.address.district}
                                                        </td>
                                                        <td>
                                                            {this.state.order.address.uf}
                                                        </td>
                                                    </tr>) : (<> </>)
                                                }
                                            </tbody>
                                        </Table>

                                        <FormGroup className="bg-warning rounded text-center font-weight-bold p-2 ">
                                            <Label>Lista de produtos</Label>
                                        </FormGroup>
                                        <Row >
                                            {this.state.order.orderItem && this.state.order.orderItem.map(p => (
                                                <Col xs={3}>
                                                    <Card className="mb-4" align="center">
                                                        <Label><h4>{p.product.name}</h4></Label>
                                                        <img src={p.product.image} alt="imagem" className="img-responsive mb-3" width="50%" />
                                                        <Label><h5>Quantidade: {p.quantity}</h5></Label>
                                                        <h5>Valor Unitário: {(p.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                                                        <h5>Total: {(p.value * p.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                                                        <h5>Codigo do produto: {p.product.id}</h5>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </>) : (<> </>)}
                            </div>


                            <Modal isOpen={this.state.isOpenAprove} >
                                <ModalHeader toggle={this.toggleModalAprove}>Pronto!</ModalHeader>
                                <ModalBody>
                                    Você realmente deseja aprovar o pedido {this.state.order.id}?
                                </ModalBody>
                                <ModalFooter>
                                    <Button outline color="secondary" onClick={e => { this.aproveOrder(e); this.toggleModalAprove(e); }}>Sim</Button>
                                    <Button outline color="secondary" onClick={this.toggleModalAprove}>Não</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.isOpen} >
                                <ModalHeader toggle={this.toggleModalCancel}>Pronto!</ModalHeader>
                                <ModalBody>
                                    Você realmente deseja cancelar o pedido {this.state.order.id}?
                                </ModalBody>
                                <ModalFooter>
                                    <Button outline color="secondary" onClick={e => { this.cancelOrder(e); this.toggleModalCancel(e); }}>Sim</Button>
                                    <Button outline color="secondary" onClick={this.toggleModalCancel}>Não</Button>
                                </ModalFooter>
                            </Modal>

                           
                        </>) : (

                            <h2 className="text-center">Erro ao encontrar o pedido</h2>

                        )}
                </Container>
            </>
        );
    }
}
