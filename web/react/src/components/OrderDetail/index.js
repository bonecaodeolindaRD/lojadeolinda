import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './styles.css';
import Axios from 'axios';
import { Container, Row, Card, CardTitle, Label } from 'reactstrap';

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            date: "",
            address: {
                cep: "",
                street: "",
                number: 0,
                complement: "",
                district: "",
                citie: "",
                state: "",
            },
            status: {
                status: "",
            }
        }
        if (!sessionStorage.getItem('client')) {
            this.props.history.push('/');
            return;
        }
        this.loadAcccount();
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        try {
            const { data: order } = await Axios.get("http://localhost:8080/ecommerce/order/id/" + id)
            this.setState({
                id: order.id,
                address: order.address,
                status: order.status,
                date: order.date
            }) 
        } catch (error) {
            return("Não há nenhum pedido!")
        }
    }

    loadAcccount = async () => {
        JSON.parse(sessionStorage.getItem('client'));
    }

    loadAcccount(e) {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <Header />
                <Container align="center">
                    <h2>Detalhes do Pedido <h2 className="text-danger">{this.state.id}</h2></h2>
                    <br></br>
                    <Card>
                        <Row>
                            <Card body>
                                <CardTitle><h5 className="bg-warning p-2 text-center">ENDEREÇO</h5></CardTitle>
                                <Label>CEP: {this.state.address.cep}</Label>
                                <Label>Rua: {this.state.address.street}</Label>
                                <Label>Nº {this.state.address.number} Compl: {this.state.address.complement}</Label>
                                <Label>Bairro: {this.state.address.district} </Label>
                                <Label>Cidade: {this.state.address.citie} - {this.state.address.uf}</Label>
                            </Card>
                            <Card body>
                                <CardTitle><h5 className="bg-warning p-2 text-center">ITENS</h5></CardTitle>

                            </Card>
                            <Card body>
                                <CardTitle><h5 className="bg-warning p-2 text-center">OUTROS</h5></CardTitle>
                                <Label>Data do Pedido: {(new Date(this.state.date).toLocaleDateString('pt-Br'))}</Label>
                                <Label>Status do Pedido: {this.state.status.status}</Label>
                                <Label>Entrega: Prevista para 10 dias utéis.</Label>
                            </Card>
                        </Row>
                    </Card>
                </Container>
                <Footer />
            </>
        )
    }

}
export default OrderDetail;