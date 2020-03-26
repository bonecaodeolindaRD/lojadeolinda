import React, { Component } from 'react';
import axios from 'axios';


import Header from '../Header';
import { Container, Form, InputGroup, Label, Input, FormGroup, Col, Row, Button, Card, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class ManageOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderId: "",
            order: {
                status: {
                    idStatus: 0
                }
            },
            erro: "",
            statusList: []
        }
        this.findStatus();
    }

    cancelOrder = async (evt) => {
        evt.preventDefault();
        try {
            let order = await axios.post("http://localhost:8080/ecommerce/order/cancel/" + this.state.orderId);
            if (!order.data) {
                this.setState({ erro: "Erro ao editar o pedido" });
                return;
            }
            this.findOrder(evt);
            this.setState({ erro: "Pedico cancelado com sucesso" });
        } catch{
            this.setState({ erro: "Erro ao editar o pedido" });
        }
    }

    findStatus = async (evt) => {
        try {
            let statusList = await axios("http://localhost:8080/ecommerce/status");
            if (!statusList.data) {
                return;
            }
            this.setState({ statusList: statusList.data });
        } catch{
            this.setState({ erro: "Erro ao achar os status" });
        }
    }

    findOrder = async (evt) => {
        evt.preventDefault();
        try {
            let order = await axios("http://localhost:8080/ecommerce/order/" + this.state.orderId);
            if (!order.data) {
                this.setState({ erro: "Erro ao achar o pedido" });
                return;
            }
            this.setState({ order: order.data });
        } catch{
            this.setState({ erro: "Erro ao achar o pedido" });
        }
    }
    
    toggleModal = (evt) => {
        evt.preventDefault();
        if(this.state.order.status.idStatus === 6){
            this.setState({ erro: "O pedido já se contra cancelado" });
            return;
        }
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <>
                <Header />
                <Container className="mt-5">
                    <div className="border p-2">
                        <FormGroup className="bg-warning rounded font-weight-bold text-center p-2">
                            <Label>Pedido</Label>
                            <p className="text-danger">{this.state.erro}</p>
                        </FormGroup>
                        <Row>
                            <Col xs={3}>
                                <Form onSubmit={this.findOrder}>
                                    <FormGroup>
                                        <Label for="ordernumber">Numero do pedido</Label>
                                        <InputGroup>
                                            <Input type="text" id="ordernumber" name="ordernumber" placeholder="Numero do pedido" value={this.state.orderId} onChange={e => this.setState({ orderId: e.target.value })} />
                                            <Button type="submit">Buscar</Button>
                                        </InputGroup>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col xs={3}>
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
                                <Form onSubmit={this.toggleModal}>
                                    <FormGroup>
                                        <Label for="orderdate"> </Label>
                                        <Button color="danger" type="submit" id="orderdate" className="form-control">Cancelar</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
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
                    </div>
                </Container>

                <Modal isOpen={this.state.isOpen} >
                    <ModalHeader toggle={this.toggleModal}>Pronto!</ModalHeader>
                    <ModalBody>
                        Você realmente deseja cancelar o pedido {this.state.order.id}?
                     </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={e => {this.cancelOrder(e); this.toggleModal(e);}}>Sim</Button>
                        <Button outline color="secondary" onClick={this.toggleModal}>Não</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}
