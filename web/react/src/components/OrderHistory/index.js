import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Container } from 'reactstrap';

class OrderHistory extends Component{
    constructor(props){
        super(props);
        this.getOrders();
        this.state = {
            isOpen: false,
            orders: this.getOrders()
        }
    }

    getOrders = () => {
        let account = sessionStorage.getItem('client') ? JSON.parse(sessionStorage.getItem('client')) : "";
        console.log(account)
        this.setState({ 
            ...this.state,
            orders: account.orders,
        });
        return account.orders
    }

    render(){
        return(
            <>
            <Header></Header>
            <Container>

            </Container>
            <Footer></Footer>
            </>
        )
    }
}

export default OrderHistory;