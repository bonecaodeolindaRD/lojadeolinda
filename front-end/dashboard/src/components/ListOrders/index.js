import React, { Component } from 'react';
import api from '../../services/api';

import Header from '../Header';
import { Container, Row, Col, FormGroup, Label, InputGroup, Button, Input, Form, Table } from 'reactstrap';


export default class ListOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            orders: []
        }
    }

    findOrders = async evt => {
        evt.preventDefault();
        let orders = {};
        try {
            if (this.state.date)
                orders = await api.get("/order/date/" + this.state.date);
            else
                orders = await api.get("/order");

            this.setState({ orders: orders.data });
        } catch{
            return;
        }
    }

    render() {
        return (
            <>
                <Header />
                <Container className="mt-5 border p-2">
                    <Form onSubmit={this.findOrders}>
                        <Row>
                            <Col xs={4}>
                                <FormGroup>
                                    <Label for="date">Data:</Label>
                                    <InputGroup>
                                        <Input value={this.state.date} onChange={e => this.setState({ date: e.target.value })} type="date" id="date" name="date" />
                                        <Button type="subtmit">Buscar</Button>
                                    </InputGroup>
                                </FormGroup>

                            </Col>
                        </Row>
                    </Form>
                    {this.state.orders && (
                        <>
                            <FormGroup className="bg-warning rounded text-center font-weight-bold p-2 ">
                                <Label>Cliente</Label>
                            </FormGroup>

                            <Table bordered className="table table-striped" style={{ marginTop: 20 }} >
                                <thead>
                                    <th>Numero</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Valor</th>
                                    <th>Ação</th>
                                </thead>
                                <tbody>
                                    {this.state.orders.map(o => (
                                        <tr>
                                            <td>{o.id}</td>
                                            <td>{new Date(o.date).toLocaleDateString("pt-br")}</td>
                                            <td>{o.status.status}</td>
                                            <td>{o.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                            <td><Button type="button" onClick={e => this.props.history.push("/manager/" + o.id)}>Ver</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>)
                    }
                </Container>
            </>
        );
    }
}
