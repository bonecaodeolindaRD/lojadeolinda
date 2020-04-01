import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './styles.css';
import api from '../../services/api';
import { Container, Row, Card, CardTitle, Label, Col } from 'reactstrap';

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            date: "",
            value: "",
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
            },
            orderItem: []
        }
    }

    async componentDidMount() {

        if (!sessionStorage.getItem('client')) {
            this.props.history.push('/');
            return;
        }
        this.loadAcccount();
        
        const { id } = this.props.match.params;

        try {
            const { data: order } = await api.get("/order/" + id)
            this.setState({
                id: order.id,
                address: order.address,
                status: order.status,
                date: order.date,
                value: order.value,
                orderItem: order.orderItem
            })
        } catch (error) {
            return ("Não há nenhum pedido!")
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
                <Container >
                    <div align="center">
                        <h2 className="bg-warning p-2 text-center">Detalhes do Pedido: <span className="text-danger"><h2>{this.state.id}</h2></span></h2>
                    </div>
                    <br></br>
                    <Card className="mb-2">
                        <Row>
                            <Card body align="center">
                                <CardTitle><h5 className="bg-warning p-2 text-center">ENDEREÇO</h5></CardTitle>
                                <Label>CEP: {this.state.address.cep}</Label>
                                <Label>Rua: {this.state.address.street}</Label>
                                <Label>Nº {this.state.address.number} Compl: {this.state.address.complement}</Label>
                                <Label>Bairro: {this.state.address.district} </Label>
                                <Label>Cidade: {this.state.address.citie} - {this.state.address.uf}</Label>
                            </Card>
                            <Card body align="center">
                                <CardTitle><h5 className="bg-warning p-2 text-center">OUTROS</h5></CardTitle>
                                <h5>Valor Total: {(this.state.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                                <Label>Data do Pedido: {(new Date(this.state.date).toLocaleDateString('pt-Br'))}</Label>
                                <Label>Status do Pedido: <p className="text-danger">{this.state.status.status}</p></Label>
                                <Label>Entrega: Prevista para 10 dias úteis.</Label>
                            </Card>
                        </Row>
                    </Card>
                    <Card>
                        <Row>
                            <Card body>
                                <CardTitle><h5 className="bg-warning p-2 text-center">ITENS</h5></CardTitle>
                                <Row>
                                    {this.state.orderItem.map(p => (
                                        <Col md="4">
                                            <Card className="border-dark mb-4" align="center">
                                                <Label><h4>{p.product.name}</h4></Label>
                                                <img src={p.product.image} alt="imagem" className="img-responsive mb-3" width="50%" />
                                                <Label><h5>Quantidade: {p.quantity}</h5></Label>
                                                <h5>Valor Unitário: {(p.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                                                <h5>Total: {(p.value * p.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
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