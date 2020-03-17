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

import axios from 'axios';

import { IoMdCart } from 'react-icons/io';
import './product.css';

export default class Products extends Component {


    constructor(props){
        super(props);
        this.state = {
            products: [
                {
                    id: 1,
                    img: "https://picsum.photos/200/200",
                    nome: "Nome do produto",
                    desc: "Descricao produto",
                    preco: 999.99,
                    desconto: 0.05
                },
                {
                    id: 2,
                    img: "https://picsum.photos/200/200",
                    nome: "Nome do produto",
                    desc: "Descricao produto",
                    preco: 999.99,
                    desconto: 0.05
                },
                {
                    id: 3,
                    img: "https://picsum.photos/200/200",
                    nome: "Nome do produto",
                    desc: "Descricao produto",
                    preco: 999.99,
                    desconto: 0.05
                },
                {
                    id: 4,
                    img: "https://picsum.photos/200/200",
                    nome: "Nome do produto",
                    desc: "Descricao produto",
                    preco: 999.99,
                    desconto: 0.05
                }
            ]
        }

        this.findProducts();
    }

    findProducts = async () => {
        const { data : productss } = await axios("http://localhost:8080/ecommerce/product/all");
        let products = [];
        productss.forEach(p => products.push({
            id: p.id,
            img: p.image,
            nome: p.name,
            desc: p.description,
            preco: p.price,
            desconto: p.off
        }));
        this.setState({products});
    }

    redirect = (evt) => {
        let obj = evt.target;
        while(obj.id !== "card")
            obj = obj.parentNode;
        this.props.history.push(`/detail/${obj.children[2].innerHTML.toString()}`);
    }


    render() {
        return (
            <Row>
                {this.state.products.map(item => (
                    <Col md="3" className="mb-4">
                        <Card className="p-1 cursor-pointer" id="card" onClick={this.redirect}>
                            <CardImg top width="100%" src={item.img} alt="Imagem do produto" />
                            <CardBody>
                                <CardTitle className="h5">{item.nome}</CardTitle>
                                <CardText  >{item.desc.substring(0, 20) + "..."}</CardText>
                                <Row>
                                    <Col xs="9"  >
                                        <p><del>De: R$ {item.preco.toFixed(2)}</del></p>
                                        <p className="h6">Por: R$ {(item.preco - item.preco * item.desconto).toFixed(2)}</p>
                                    </Col>
                                    <Col xs="3" className="text-center"  >
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
