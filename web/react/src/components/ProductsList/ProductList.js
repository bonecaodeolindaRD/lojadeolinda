import React, { Component } from 'react';
import { Card, CardTitle, CardText, Container, Col, CardImg, Row, FormGroup, Label, Input } from 'reactstrap';
import {
    FaShoppingCart
} from "react-icons/fa";
import './style.css'
import Footer from '../Footer/index';

export class Product extends Component {



    constructor() {
        super();
        this.state = {
            products: [
                {
                    category: 1,
                    id: 1,
                    name: "Produto",
                    img: "https://picsum.photos/50/50",
                    price: 999.99,
                    quantity: 1,
                },
                {
                    category: 2,
                    id: 2,
                    name: "Produto",
                    img: "https://picsum.photos/50/50",
                    price: 999.99,
                    quantity: 2
                },
                {
                    category: 3,
                    id: 3,
                    name: "Produto",
                    img: "https://picsum.photos/50/50",
                    price: 999.99,
                    quantity: 3
                }
                ,
                {
                    category: 1,
                    id: 4,
                    name: "Produto",
                    img: "https://picsum.photos/50/50",
                    price: 999.99,
                    quantity: 2
                }
                ,
                {
                    category: 3,
                    id: 5,
                    name: "Produto Olinda",
                    img: "https://picsum.photos/50/50",
                    price: 999.99,
                    quantity: 2
                }
            ]

        }
        
     
    }


    searchItem() {
        let input, filter, ul, li, a, i, txtValue, itemImg, itemPrice;
        input = document.getElementById("select");
        filter = input.value.toUpperCase();
        ul = document.getElementById("order");
        li = ul.getElementsByTagName("li");
        itemsImg = this.state.products.filter(x => x.img);
        itemsPrice = this.state.products.filter(x => x.price);

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                 li[i].style.display = "";
                 
            } else {
                li[i].style.display = "none";
            }
        }


    }

    render() {

        return (
            <>

                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="Select">Categorias</Label>
                            <Input type="text" onKeyUp="searchItem()" id="select" placeholder="Digite uma categoria">
                                
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <ul id="order">
                    <li>
                        <Col md={11} className="bordList mb-2" id="play" >
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} id="Player">

                                        <CardImg className="p-3" width="100%" src={this.state.products.img} alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                            <CardTitle ><h3>{this.state.products.name}</h3></CardTitle>
                                            <CardText> Mais detalhes...
                                        </CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4"> {this.state.products.price}</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>

                        </Col>
                    </li>

                    <li>

                        <Col md={11} className="bordList mb-2" id="art">
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src={this.state.products.img} alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removerBord productDescription p-4 " >

                                            <CardTitle ><h3>{this.state.products.name}</h3></CardTitle>
                                            <CardText>Mais detalhes ...</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4"> {this.state.products.price}</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>

                        </Col>
                    </li>

                    <li>
                        <Col md={11} className="bordList mb-2" id="art" >
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src={this.state.products.img} alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removerBord productDescription p-4 " >

                                            <CardTitle ><h3>{this.state.products.name}</h3></CardTitle>
                                            <CardText>Mais detalhes ...</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4"> {this.state.products.price}</span>
                                    </Col>

                                    <Col md={2} className="productItemo">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>

                    </li>

                    <li>
                        <Col md={11} className="bordList mb-2" id="art">
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src={this.state.products.img} alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removeBord productDescription p-4 " >

                                            <CardTitle ><h3>{this.state.products.name}</h3></CardTitle>
                                            <CardText>Mais detalhes ...</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4"> {this.state.products.price}</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>

                    </li>

                    <li>
                        <Col md={11} className="bordList mb-2" id="art" >
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src={this.state.products.img} alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removeBord productDescription p-4 " >

                                            <CardTitle ><h3>{this.state.products.name}</h3></CardTitle>
                                            <CardText>Mais detalhes ...</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice">
                                        <span className="p-4"> {this.state.products.price}</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>
                    </li>

                    <li>

                        <Col md={11} className="bordList mb-2" >
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src={this.state.products.img} alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removeBord productDescription p-4 " >

                                            <CardTitle ><h3>{this.state.products.name}</h3></CardTitle>
                                            <CardText>Mais detalhes</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4"> {this.state.products.price}</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>
                    </li>

                    <li>
                        <Col md={11} className="bordList mb-2" >
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src={this.state.products.img} alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removeBord productDescription p-4 " >

                                            <CardTitle ><h3>{this.state.products.name} </h3></CardTitle>
                                            <CardText>Mais detalhes ...</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4">{this.state.products.price}</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>
                    </li>
                </ul>
                <Footer></Footer>
            </>
        );
    }


}

