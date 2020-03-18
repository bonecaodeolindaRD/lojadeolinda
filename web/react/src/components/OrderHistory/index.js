import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Container } from 'reactstrap';
import axios from 'axios';

class OrderHistory extends Component{
    constructor(props){
        super(props);
        this.getOrders();
        this.state = {
            email: "",
            orders: []
        }
        this.loadAcccount();
    }

    loadAcccount = async () => {
        let { email } = JSON.parse(sessionStorage.getItem('client'));
        let { data : account} = await axios("http://localhost:8080/ecommerce/order/email/" + email);
        this.setState({
            name : account.name,
            email : account.email,
        })
    }

    getOrders = () => {
        let account = sessionStorage.getItem('client') ? JSON.parse(sessionStorage.getItem('client')) : "";
        console.log(account)
        this.setState({ 
            orders: account.orders,
        });
        return account.orders
    }

    render(){
        return(
            <>
            <Header></Header>
            <Container className="align-center">
                <h3 align="center">Meus Pedidos</h3>
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead> 
                            <tr>
                                <th>Pedido</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th>Frete</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map(order => 
                                <tr key={order.id}>
                                    <td>
                                        {order.id}
                                    </td>
                                    <td>
                                        {order.value}
                                    </td>
                                    <td>
                                        {}
                                    </td>
                                    <td>
                                        {order.shipping}
                                    </td>
                                    <td>
                                       
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
            </Container>
            <Footer></Footer>
            </>
        )
    }
}

export default OrderHistory;