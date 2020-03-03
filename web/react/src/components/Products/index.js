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
                    id: 1,
                    img: "https://picsum.photos/200/200",
                    nome: "Nome do produto",
                    desc: "Descricao produto",
                    preco: 999.99
                },
                {
                    id: 2,
                    img: "https://picsum.photos/200/200",
                    nome: "Nome do produto",
                    desc: "Descricao produto",
                    preco: 999.99
                },
                {
                    id: 3,
                    img: "https://picsum.photos/200/200",
                    nome: "Nome do produto",
                    desc: "Descricao produto",
                    preco: 999.99
                },
                {
                    id: 2,
                    img: "https://picsum.photos/200/200",
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
                    <Col md="3" className="mb-4">
                        <Card className="p-1">
                            <CardImg top width="100%" src={item.img} alt="Imagem do produto"/>
                            <CardBody>
                                <CardTitle className="h5">{item.nome}</CardTitle>
                                <CardText>{item.desc}</CardText>
                                <Row>
                                    <Col xs="9">
                                        <span className="h6">R$ {item.preco}</span>
                                    </Col>
                                    <Col xs="3" className="text-center">
                                        <IoMdCart size="30"/>
                                    </Col>
                                </Row>
                            </CardBody>
                            <span className="d-none">{item.id}</span>
                        </Card>
                    </Col>
                ))}
            </Row>
    );
    }
}
