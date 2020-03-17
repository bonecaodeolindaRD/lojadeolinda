import React, { Component } from 'react';
import { Container, Row, Col, Table, ListGroup, ListGroupItem,  Button, Form, Label, FormGroup, Input } from 'reactstrap';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

import ShippingCalculator from '../ShippingCalculator';
import Header from '../Header';
import Footer from '../Footer';

export default class ProductDetail extends Component {

        constructor(props){
            super(props);
            this.state = {

                id: 12,
                image: "https://odia.ig.com.br/_midias/jpg/2019/03/05/700x470/1_d021stjx0airpfp-10035734.jpg",
                name: "Bonecão Galvão Bueno ",
                description: "Carlos Eduardo dos Santos Galvão Bueno, mais conhecido como Galvão Bueno (Rio de Janeiro, 21 de julho de 1950), é um empresário, narrador, radialista e apresentador esportivo brasileiro.É considerado o narrador esportivo mais famoso do Brasil." ,
                quantity: 1,                
                price: 1000
            }

                this.getProduct();
                                        
        } 

        getProduct = async() => {
            let id = this.props.match.params.id;
            const { data : product } = await axios("http://localhost:8080/ecommerce/product/id/" + id);
            this.setState({
                id: product.id,
                image: product.image,
                name: product.name,
                description: product.description,
                price: product.price
            });
        }
            

        change(event) {

              this.setState({ quantity: event.target.value });      
        };

        handleFormSubmit = (event) => {

            event.preventDefault();

            let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

            if(cart.length > 0) {
                for (var i in cart) {
                    if(cart[i].id === this.state.id){
                        cart[i].quantity = parseInt(this.state.quantity) + parseInt(cart[i].quantity);
                        cart[i].totalItem =  this.state.price *  cart[i].quantity;
                        sessionStorage.cart = JSON.stringify(cart);
                        this.props.history.push("/cart");
                        return;
                    }
                }
            }

            cart.push({
                id: this.state.id,
                name: this.state.name,
                image: this.state.image,
                description: this.state.description,
                quantity: this.state.quantity,
                price: this.state.price,
                totalItem: this.state.price * this.state.quantity

            });

            sessionStorage.setItem('cart', JSON.stringify(cart));
            
            this.props.history.push("/cart");

          };


        render() {

                return (  

                    <>
                    <Header/>
                    <Container className="pt-5 pb-2 " >
                    <Row className="row">

                        <Col className="mb-3" xs="12" sm="4" md="4" lg="4">
                                <img src={this.state.image} className="rounded" width="100%"
                                    title="Imagem Produto" alt="Imagem do produto" />
                        </Col>

                        <Col xs="12"  sm="6" md="6" lg="6">

                            <h3>{this.state.name}</h3>
                            <hr className="soft" />
                            <Form className="form-horizontal qtyFrm">
                                <FormGroup className="control-group">
                                    <Label for="qtd"  className="control-label pb-2 pr-5"><h5>R${(this.state.price).toFixed(2)}</h5></Label >
                                    <Input type="number" placeholder="Digite a quantidade" min="1" max="10" id="qtd"  value={this.state.quantity} onChange={(e) => this.change(e)} className="col-6 mb-2"  />

                                            <Button color="warning" onClick={this.handleFormSubmit}> <FaShoppingCart/> Comprar</Button>

                                </FormGroup>
                            </Form>

                            <ShippingCalculator/>
                        
                            <ListGroup id="productDetail" className="nav nav-tabs pt-3">
                                <ListGroupItem><h6 data-toggle="tab">Descrição do Produto</h6></ListGroupItem>
                            </ListGroup>

                            <Table>
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                        {this.state.description}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table >
                        </Col>
                    </Row>    

                    </Container >
                    
                    <Footer/>

                    </>
               );
       }
}
