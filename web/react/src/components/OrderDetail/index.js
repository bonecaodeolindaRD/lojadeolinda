import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './styles.css';
import Axios from 'axios';
import { Container, Row, Card, CardTitle } from 'reactstrap';

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            address: ""
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        try {
            const { data: order } = await Axios.get("http://localhost:8080/ecommerce/order/id/" + id)
            this.setState({
                id: order.id,
                address: order.address
            })
            console.log(order)
        } catch (error) {

        }
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
                                <CardTitle>Endereço</CardTitle>
                                {this.address}
                            </Card>
                            <Card body>
                                <CardTitle>Itens</CardTitle>
                     
                            </Card>
                            <Card body>
                                <CardTitle>Outros</CardTitle>
                            </Card>
                        </Row>
                    </Card>
                </Container>
                <div className="footer">
                    <Footer />
                </div>
            </>
        )
    }

}
export default OrderDetail;