import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Container } from 'reactstrap';
import axios from 'axios';

class OrderHistory extends Component{
    constructor(props){
        super(props);
        this.state = {
            orders: []
        }
        this.loadAcccount();
        console.log(this.loadAcccount());
        
    }

    loadAcccount = async () => {
        let { email } = JSON.parse(sessionStorage.getItem('client'));
        let response = await axios("http://localhost:8080/ecommerce/client/orders/" + email);
        this.setState({
            orders: response.data 
        })
    }

    render(){
        return(
            <>
            <Header/>
            <Container className="align-center">
                <h3 align="center">Meus Pedidos</h3>
                    <table bordered className="table table-striped mt-20" > >
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
                            {this.state.account.orders.map(order => 
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
                                       {order.status}
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
            </Container>
            <Footer/>
            </>
        )
    }
}

export default OrderHistory;