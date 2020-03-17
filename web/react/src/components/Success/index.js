import React, { Component } from 'react';
import Header from '../Header';
import {  Card,Jumbotron,Form, Row, Col,CardTitle,  Button,  } from 'reactstrap';
//import { Link } from 'react-router-dom';
//import { FaShoppingBasket} from 'react-icons/fa';

export default class Success extends Component {

    constructor(props){
        super(props);
        this.id = 0;
        this.clearLocal();
    }

    clearLocal = () => {
        let {id} = JSON.parse(sessionStorage.getItem('order'));
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
                    <p className="lead">Numero do pedido : </p>
                    <hr className="my-2" />
                    <Form >
                        <Row>
                            <Col>
                                <h5 className="bg-warning p-2 text-center">Resumo da compra</h5>
                                <div>
                                    
                                        <Card body className="mb-2">
                                            <Row>
                                                <Col>
                                                    <CardTitle>
                                                       Nome produto
                                                    </CardTitle>
                                                    Imagem do produto
                                                    
                                                </Col>
                                                <Col>
                                                    <p className="h6">R$</p>
                                                    <p className="h6">Qtd: quantidade do produto</p>
                                                    <p className="h6">Subtotal: R$ subtotal do produto</p>
                                                </Col>
                                            </Row>
                                        </Card>
                                    ))
                                    }
                                    <p className="lead">
                                        <Button color="primary">Voltar para Home</Button>
                                    </p>

                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Jumbotron>

            </>

        )
    }
}
