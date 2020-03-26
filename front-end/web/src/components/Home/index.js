import React, { Component } from 'react';
import axios from 'axios';

import {
    Container
} from 'reactstrap';

import Produtos from '../Products';
import Carrossel from '../Carrossel';
import Header from '../Header';
import Footer from '../Footer';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            products: [],
            loading: true
        }
        this.findProducts();
    }


    findProducts = async () => {
        this.setState({ loading: true });
        try {
            const { data: productss } = await axios("http://localhost:8080/ecommerce/product/home");
            let products = [];
            productss.forEach(p => products.push({
                id: p.id,
                img: p.image,
                nome: p.name,
                desc: p.description,
                preco: p.price,
                desconto: p.off

            }));
            this.setState({ products });
            this.setState({ loading: false });
        } catch {
            this.setState({ products: [] });
        }
    }

    render() {

        return (
            <>
                <Header history={this.props.history} location={this.props.location}/>
                <Container>
                    <Carrossel />
                    <Produtos history={this.props.history} products={this.state.products}/>
                </Container>
                <Footer />
            </>
        );
    }
}