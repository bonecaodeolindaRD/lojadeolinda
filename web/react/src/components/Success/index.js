import React, { Component } from 'react';
import Header from '../Header';
import { Jumbotron, CardText, Button, Col, Row, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaShoppingBasket } from 'react-icons/fa';



export default class Success extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [

            ]
        }
        this.id = 0;
        if (!sessionStorage.getItem('order')) {
            this.props.history.push('/');
            return;
        }

        this.clearLocal();
        this.getProducts();
    }

    clearLocal = () => {
        let { id } = JSON.parse(sessionStorage.getItem('order'));
        this.id = id;
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('order');
    }

    getProducts = async () => {

        let productsItem = await JSON.parse(sessionStorage.getItem('cart'));
<<<<<<< HEAD

        productsItem.forEach(p => this.state.products.push({
=======
    

        

        if (productsItem === null) {
            //this.props.history.push("/");
            return
        }
        this.state.products.forEach(p => productsItem.push({
>>>>>>> ade2059cbcce3df64c8b6024412842b200242cab
            id: p.id,
            img: p.image,
            name: p.name,
            desc: p.description,
            price: p.price,
            quantity: p.quantity

        }));
<<<<<<< HEAD
=======

        
>>>>>>> ade2059cbcce3df64c8b6024412842b200242cab
        this.setState({ products: productsItem });



    }
    render() {

        return (
            <>

                <Header history={this.props.history} location={this.props.location} />

                <section className="d-flex justify-content-center">
                    <Jumbotron className="col-9">
                        <h1 className="display-3 text-success">Compras concluídas</h1>
                        <p className="lead">Detalhes do pedido</p>
                        <hr className="my-2" />
                        <CardText >

                            Número do pedido: {this.id}


                        </CardText>

                        <CardText >
                            Resumo da compra :

                    </CardText>
                        {this.state.products.map(item => (

                            <Row className="row cart-row mt-5 mb-5" id="cart-row-prod" key={this.state.id}>

                                <Col xs="12" sm="2">

                                    <img src={item.image} alt={item.name} title={item.name}
                                        className="img-responsive mb-3" width="100%" />
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

                            </Row>

                        ))}

                        <Link to='/home'>
                            <Button color="warning" > <FaShoppingBasket /> Voltar as compras</Button>
                        </Link>

                    </Jumbotron>

                </section>


            </>

        )
    }
}