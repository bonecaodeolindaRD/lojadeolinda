import React, { Component } from 'react';
import Header from '../Header';
import { Jumbotron, CardText, Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaShoppingBasket } from 'react-icons/fa';



export default class Success extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [

            ],
            total: 0
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
        // sessionStorage.removeItem('cart');
        // sessionStorage.removeItem('order');
    }

    getProducts = async () => {

        let productsItem = await JSON.parse(sessionStorage.getItem('cart'));
        if (productsItem === null) {
            //this.props.history.push("/");
            return
        }
        this.state.products.forEach(p => productsItem.push({
            id: p.id,
            image: p.image,
            name: p.name,
            desc: p.description,
            value: p.value,
            quantity: p.quantity,
            totalItem: p.totalItem
            
        }));

        
        this.setState({ products: productsItem });



    }

    componentDidMount() {

        let totalCart = 0;

        let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

        for (var i in cart) {
            totalCart += cart[i].totalItem;
        }


        this.setState({ total: totalCart });

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

                            <Row className="row cart-row mt-5 mb-5" id="cart-row-prod" key={item.id}>

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
                                        R${(item.value).toFixed(2)}
                                    </h5>
                                    <small>Valor Unitário</small>
                                </Col>

                                <Col className="mb-3" xs="5" sm="2" >
                                    <h5 className="h3-price text-success" >
                                        R${(item.totalItem).toFixed(2)}
                                    </h5>
                                    <small>Valor total</small>
                                </Col>

                                <Col className="mb-3" xs="7" sm="2">
                                    <h5 className="h3-price">
                                        {(item.quantity)}
                                    </h5>

                                    <small>Quantidade</small>

                                </Col>

                            </Row>



                        ))}
                        
                            <h4 className="d-flex justify-content-end mt-3 mb-5  mr-1">Total: {(this.state.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                       




                        <Link to='/home' className="d-flex justify-content-end mt-3 mb-5 mr-1">
                            <Button color="warning" > <FaShoppingBasket /> Voltar as compras</Button>
                        </Link>

                    </Jumbotron>

                </section>


            </>

        )
    }
}