import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './styles.css';
import Axios from 'axios';
import { Container } from 'reactstrap';

class OrderDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: ""
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        try{
            const { data : order } = await Axios.get("http://localhost:8080/ecommerce/order/id/"+id)
            this.setState({
                id: order.id,
            })
        } catch ( error ) {

        }
    }    

    render(){
        return(
            <>
            <Header/>
            <Container align="center">
                <h2>Detalhes do Pedido: <a className="text-danger">{this.state.id}</a></h2>

            </Container>
            <div className="footer">
                <Footer/>
            </div>
            </>
        )
    }

}
export default OrderDetail;