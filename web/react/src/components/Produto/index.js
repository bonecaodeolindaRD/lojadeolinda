import React, { Component } from 'react';
import { Card, CardTitle, CardText, Container, Col, CardImg, Row } from 'reactstrap';
import {
    FaShoppingCart
} from "react-icons/fa";
import './style.css'
export class Produto extends Component {

    render() {

        return (
            <>
                <Col md={11}className="bordasLista mb-2" title="`${categoria}`">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://picsum.photos/200" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Special Title Treatment</h3></CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional contentshaddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        .</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container>
                </Col>

                <Col md={11}className="bordasLista mb-2" title="`${categoria}`">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://picsum.photos/200" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Special Title Treatment</h3></CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional contentshaddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        .</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container>
                </Col>

                <Col md={11}className="bordasLista mb-2" title="`${categoria}`">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://picsum.photos/200" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Special Title Treatment</h3></CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional contentshaddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        .</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container>
                </Col>


                <Col md={11}className="bordasLista mb-2" title="`${categoria}`">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://picsum.photos/200" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Special Title Treatment</h3></CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional contentshaddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        .</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container>
                </Col>


                <Col md={11}className="bordasLista mb-2" title="`${categoria}`">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://picsum.photos/200" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Special Title Treatment</h3></CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional contentshaddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        .</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container>
                </Col>


                <Col md={11}className="bordasLista mb-2" title="`${categoria}`">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://picsum.photos/200" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Special Title Treatment</h3></CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional contentshaddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        .</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container>
                </Col>


                <Col md={11}className="bordasLista mb-2" title="`${categoria}`">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://picsum.photos/200" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Special Title Treatment</h3></CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional contentshaddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        .</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container>
                </Col>
          
            </>
        );
    }
}