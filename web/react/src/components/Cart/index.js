import React, { Component } from 'react';
import { Col, Row, Container, Input, Button, Alert } from 'reactstrap';
import { FaTimesCircle, FaShoppingBasket, FaSadTear, FaWpforms } from 'react-icons/fa';

import './index.css';
import Header from '../Header';
import { Link } from 'react-router-dom';


export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            total: 0
        }
    }

    componentDidMount() {

        let totalCart = 0;

        let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

        for (var i in cart) {
            totalCart += cart[i].totalItem;
        }


        this.setState({ total: totalCart, products: cart });

    }


    remove = (id) => {

        let totalCart = 0;

        let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

        let item = cart.find(x => x.id === id);

        cart.splice(cart.indexOf(item), 1);

        sessionStorage.setItem('cart', JSON.stringify(cart));

        let products = this.state.products.filter((item) => item.id !== id);

        for (var i in products) {
            totalCart += cart[i].totalItem;
        }

        this.setState({ total: totalCart, products: products });
        sessionStorage.removeItem(item);


    };

    finish = () => {
        if (sessionStorage.getItem('client'))
            this.props.history.push("/checkout");
        else
            this.props.history.push("/login");
    }



    render() {

        const { products } = this.state;

        return (

            <>

                <Header history={this.props.history} location={this.props.location} />


                <Container className="contanier">

                    {products.length === 0 ?

                        <>

                            <Alert color="danger" className="d-flex justify-content-center mt-5 mb-4 mr-1">

                                <h4><FaSadTear /> O seu carrinho está vazio!!</h4>

                            </Alert >

                            <div className="d-flex justify-content-center ">

                                <Link to="/home"><Button color="success"><FaShoppingBasket /> Adicionar Produtos</Button></Link>

                            </div>


                        </>

                        : ''}

                    {this.state.products.map(item => (

                        <Row className="row cart-row mt-5 mb-5" id="cart-row-prod" key={item.id}>

                            <Col xs="12" sm="2">
                                <div className="float-left">
                                    <p id="removeItem" onClick={() => this.remove(item.id)} title="Remover item do carrinho!">
                                        <FaTimesCircle />
                                    </p>
                                </div>
                                <img src={item.image} alt={item.name} title={item.name}
                                    className="img-responsive mb-3" width="100%" />
                            </Col>

                            <Col className="mb-3" xs="12" sm="4" id="p">
                                <h5>{item.name}</h5>
                                <small>Nome do Produto</small>
                            </Col>

                            <Col className="mb-3" xs="5" sm="2">
                                <h5 className="h3-price">
                                    {(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </h5>
                                <small>Preço Unitário</small>
                            </Col>

                            <Col className="mb-3" xs="7" sm="2">
                                <div className="form-group">
                                    <Input type="number" name="quantidade" value={item.quantity} id={item.id} min="1"  className="cart-qty-input" readOnly />
                                    
                                    <small>Quantidade</small>
                                </div>
                            </Col>

                            <Col className="mb-3" xs="12" sm="2">
                                <h5 className="h3-price">
                                    {(item.totalItem).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </h5>
                                <small>Total Item</small>
                            </Col>

                        </Row>

                    ))}


                    {products.length > 0 ?

                        <>


                            <Alert className="d-flex justify-content-end mt-3 mb-5  mr-1">

                                <h6>Total: {(this.state.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h6>

                            </Alert>

                            <Row className="d-flex justify-content-end mt-5 mr-1 ">
                                <Link to="/">
                                    <Button color="warning" >  Adicionar mais produtos</Button>
                                </Link>

                            </Row>

                            <Col className="d-flex justify-content-end mt-3 mb-5 mr-1">


                                <Button color="success" onClick={this.finish}> <FaWpforms /> Finalizar Compra</Button>

                            </Col>





                        </>

                        : ''}

                </Container>

            </>

        );
    }
}
