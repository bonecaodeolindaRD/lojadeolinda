import React, { Component } from 'react';
import api from '../../services/api';

import Header from '../Header';
import { Container, Row, Col, FormGroup, Label, InputGroup, Button, Input, Form, Table } from 'reactstrap';


export default class ListOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            status: 0,
            listStatus: [],
            orders: []
        }

    }

    componentDidMount() {
        this.findStatusList();
        this.existentUser();
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

    findStatusList = async () => {
        try {
            let statusList = await api.get("/status");
            if (!statusList.data) {
                this.setState({ listStatus: [] });
                return;
            }
            this.setState({ listStatus: statusList.data });
        } catch{
            this.setState({ listStatus: [] });
        }
    }

    findOrders = async evt => {
        evt.preventDefault();
        let orders = {};
        try {
            if (this.state.status <= 0)
                if (this.state.date)
                    orders = await api.get("/order/date/" + this.state.date);
                else
                    orders = await api.get("/order");
            else
                if (this.state.date)
                    orders = await api.get("/order/" + this.state.date + "/" + this.state.status);
                else
                    orders = await api.get("/order/status/" + this.state.status);

            this.setState({ orders: orders.data });
        } catch{
            this.setState({ orders: [] })
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
                                    <Input value={this.state.date} onChange={e => this.setState({ date: e.target.value })} type="date" id="date" name="order-date" />
                                </FormGroup>
                            </Col>
                            <Col xs={3}>
                                <FormGroup>
                                    <Label for="status">Status:</Label>
                                    <InputGroup>
                                        <Input type="select" id="status" name="order-status" value={this.state.status} onChange={e => this.setState({ status: e.target.value })}>
                                            <option value={0}>Todos</option>
                                            {this.state.listStatus.length > 0 &&
                                                this.state.listStatus.map(s =>
                                                    (
                                                        <option value={s.idStatus}>{s.status}</option>
                                                    )
                                                )
                                            }
                                        </Input>
                                        <Button type="subtmit">Buscar</Button>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                    {this.state.orders && (
                        <>
                            <FormGroup className="bg-warning rounded text-center font-weight-bold p-2 ">
                                <Label>Pedidos:</Label>
                            </FormGroup>
                            {this.state.orders.length > 0 ? (
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
                                            <tr key={o.id}>
                                                <td>{o.id}</td>
                                                <td>{new Date(o.date + " 03:00:00").toLocaleDateString("pt-br")}</td>
                                                <td>{o.status.status}</td>
                                                <td>{o.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                                <td><Button type="button" onClick={e => this.props.history.push("/manager/" + o.id)}>Ver</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>)

                                :
                                (<h5 className="text-center">Nenhum pedido encontrado</h5>)
                            }
                        </>)
                    }
                </Container>
            </>
        );
    }
}
