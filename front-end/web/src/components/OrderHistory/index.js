import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Container } from 'reactstrap';
import api from '../../services/api';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import './styles.css'

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            margin: 580
        }
      
    }

    componentDidMount(){
        if (!sessionStorage.getItem('client')) {
            this.props.history.push('/');
            return;
        }
        this.loadAcccount();
    }

    loadAcccount = async () => {
        let { email } = JSON.parse(sessionStorage.getItem('client'));
        try {
            let response = await api.get("/client/orders/" + email);
            if (response)
                await this.setState({
                    orders: response.data.orders
                })
            let margin = this.state.margin - this.state.orders.length * 80;
            if (margin <= 40)
                this.setState({margin: 40});
            else
                this.setState({ margin });
        } catch{
            this.setState({ margin: 580 });
        }
    }

    loadAcccount(e) {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <Header />
                <Container className="text-center" style={{ marginBottom: this.state.margin }}>
                    
                    {this.state.orders ? (
                        <>
                        
                        <div className="h-100">
                        <h3 align="center">Meus Pedidos</h3>
                        <Table bordered className="table table-striped" responsive style={{ marginTop: 20 }} >
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
                                            {(order.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td>
                                            {(new Date(order.date).toLocaleDateString('pt-Br'))}
                                        </td>
                                        <td>
                                            {(order.shipping).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
                        </div>
                        </>
                        
                ) :
                        (
                            <>
                                <span className="h2">Nenhuma compra encontrada!</span>
                                <div className="mt-3">
                                    <Link to="/"><Button className="btn btn-success mr-3" > Comprar </Button></Link>
                                </div>
                            </>
                        )}
                        
                </Container>
                <Footer />
            </>
        )
    }
}

export default OrderHistory;