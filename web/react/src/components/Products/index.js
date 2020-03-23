import React, { Component } from 'react';

import {
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Spinner,
    Container
} from 'reactstrap';

import axios from 'axios';

import { IoMdCart } from 'react-icons/io';
import './product.css';

export default class Products extends Component {


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true
        }
    }



    redirect = (evt) => {
        let obj = evt.target;
        while (obj.id !== "card")
            obj = obj.parentNode;
        this.props.history.push(`/detail/${obj.children[2].innerHTML.toString()}`);
    }


    render() {
        return (
            <Row>
                {!this.props.loading ?
                    this.props.products.length > 0 ?
                        (this.props.products.map(item => (
                            <Col md="3" className="mb-4">
                                <Card className="p-1 cursor-pointer" id="card" onClick={this.redirect}>
                                    <CardImg top width="100%" src={item.img} alt="Imagem do produto" />
                                    <CardBody>
                                        <CardTitle className="h5">{item.nome}</CardTitle>
                                        <CardText  >{item.desc.substring(0, 20) + "..."}</CardText>
                                        <Row>
                                            <Col xs="9"  >
                                                <p><del>De: R$ {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</del></p>
                                                <p className="h6">Por: R$ {(item.preco - item.preco * item.desconto).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                            </Col>
                                            <Col xs="3" className="text-center"  >
                                                <IoMdCart size="30" />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <span className="d-none">{item.id}</span>
                                </Card>
                            </Col>
                        ))) : (<Container className="text-center">
                            <pre className="h2">
                                Erro ao carregar os produtos
                        <br />
                            Tente novamente mais tarde
                            <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </pre>
                        </Container>) : (
                        <Container className="text-center">
                            <Spinner color="warning" />
                        </Container>
                    )
                }
            </Row>
        );
    }
}
