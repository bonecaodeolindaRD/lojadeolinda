import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Container } from 'reactstrap';
import axios from 'axios';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import './styles.css'

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
        if (!sessionStorage.getItem('client')) {
            this.props.history.push('/');
            return;
        }
        this.loadAcccount();
    }

    loadAcccount = async () => {
        let { email } = JSON.parse(sessionStorage.getItem('client'));
        let { data: response } = await axios("http://localhost:8080/ecommerce/client/orders/" + email);
        this.setState({
            orders: response.orders
        })
    }

    loadAcccount(e) {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <Header />
                <Container className="align-center">
                    <h3 align="center">Meus Pedidos</h3>
                    <Table bordered className="table table-striped" style={{ marginTop: 20 }} >
                        <thead>
                            <tr align="center">
                                <th>Pedido</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th>Frete</th>
                                <th>Status</th>
                                <th>Detalhes</th>
                            </tr>
                        </thead>
                        <tbody align="center">
                            {this.state.orders.map(order =>
                                <tr key={order.id}>
                                    <td>
                                        {order.id}
                                    </td>
                                    <td>
                                        {order.value}
                                    </td>
                                    <td>
                                        {order.date}
                                    </td>
                                    <td>
                                        {order.shipping}
                                    </td>
                                    <td>
                                        {order.status.status}
                                    </td>
                                    <td>
                                        <div align="center">
                                            <Link to={"/order/detail/" + order.id} ><Button color="info" className="btn btn-primary">Detalhes</Button></Link>
                                        </div>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
                </Container>
                <div className="footer" id="footer">
                <Footer/>
                </div>
            </>
        )
    }
}

export default OrderHistory;