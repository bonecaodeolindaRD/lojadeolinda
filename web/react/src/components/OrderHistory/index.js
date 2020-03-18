import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Container } from 'reactstrap';

class OrderHistory extends Component{
    constructor(props){
        super(props);
        this.getOrders();
        this.state = {
            orders: []
        }
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
            <Container>
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
                                <tr key={order.ID_ORDER}>
                                    <td>
                                        {order.ID_ORDER}
                                    </td>
                                    <td>
                                        {order.VL_VALUE}
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