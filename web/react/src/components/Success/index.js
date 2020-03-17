import React, { Component } from 'react';
import Header from '../Header';
import { Jumbotron, Form, Row, Col, Input } from 'reactstrap';
import { FaTimesCircle } from 'react-icons/fa';
//import { Link } from 'react-router-dom';
//import { FaShoppingBasket} from 'react-icons/fa';

export default class Success extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        
        }
        this.id = 0;
        if(sessionStorage.getItem('order')){
            this.props.history.push("/");
            return;
        }
        this.clearLocal();
    }

    clearLocal = () => {
        let { id } = JSON.parse(sessionStorage.getItem('order'));
        this.id = id;
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('order');
        setTimeout(() => this.props.history.push("/"), 30000);
    }

    render() {

        return (
            <>
                <Header />
                <Jumbotron>
                    <h1 className="display-3">Compra Concluida</h1>
                    <p className="lead">Numero do pedido : {this.id} </p>
                    <hr className="my-2" />
                    <Form >
                        <Row>
                            <Col>
                                <h5 className="bg-warning p-2 text-center">Resumo da compra</h5>
                                {this.state.products.map(item => (

                                    <Row className="row cart-row mt-5 mb-5" id="cart-row-prod" key={item.id}>

                                        <Col xs="12" sm="2">
                                           
                                            <img src={item.image} alt={item.name} title={item.name}
                                                />
                                        </Col>

                                        <Col className="mb-3" xs="12" sm="4" id="p">
                                            <h5>{item.name}</h5>
                                            <small>Nome do Produto</small>
                                        </Col>

                                        <Col className="mb-3" xs="5" sm="2">
                                            <h5 className="h3-price">
                                                R${(item.price).toFixed(2)}
                                            </h5>
                                            <small>Preço Unitário</small>
                                        </Col>

                                        <Col className="mb-3" xs="7" sm="2">
                                            <div className="form-group">
                                                <Input type="text" name="quantidade" value={item.quantity} id={item.id} min="1" className="cart-qty-input" readOnly />
                                                <small>Quantidade</small>
                                            </div>
                                        </Col>

                                        <Col className="mb-3" xs="12" sm="2">
                                            <h5 className="h3-price">
                                                R${(item.totalItem).toFixed(2)}
                                            </h5>
                                            <small>Total Item</small>
                                        </Col>

                                    </Row>

                                ))}
                            </Col>
                        </Row>
                    </Form>
                </Jumbotron>

            </>

        )
    }
}
