import React, { Component } from 'react';

import {
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap';

import { IoMdCart } from 'react-icons/io';

export default class Products extends Component {

    constructor(){
        super();
        this.state = {
            products: [
                {
                    img: "https://picsum.photos/200/300",
                    nome: "Nome do produto",
                    desc: "Descricao produto",
                    preco: 999.99
                },
                {
                    img: "https://picsum.photos/200/300",
                    nome: "Nome do produto",
                    desc: "Descricao produto",
                    preco: 999.99
                },
                {
                    img: "https://picsum.photos/200/300",
                    nome: "Nome do produto",
                    desc: "Descricao produto",
                    preco: 999.99
                },
                {
                    img: "https://picsum.photos/200/300",
                    nome: "Nome do produto",
                    desc: "Descricao produto",
                    preco: 999.99
                }
            ]
        }
    }
    render() {
        return (
            <Row>
                {this.state.products.map(item => (
                    <Col md="3">
                        <Card>
                            <CardImg top width="100%" src={item.img} alt="Imagem do produto"/>
                            <CardBody>
                                <CardTitle className="h5">{item.nome}</CardTitle>
                                <CardText>{item.desc}</CardText>
                                <Row>
                                    <Col xs="9">
                                        <span className="h6">R$ {item.preco}</span>
                                    </Col>
                                    <Col xs="3">
                                        <IoMdCart/>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
    );
    }
}
