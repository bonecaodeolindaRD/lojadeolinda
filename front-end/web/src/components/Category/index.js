import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

import {
    Container,
} from 'reactstrap';

import Header from '../Header';
import Produtos from '../Products';
import Footer from '../Footer';

export default class Category extends Component {

    constructor(props){
        super(props);
        this.state = {
            products: [],
            loading: true
        }
    }

    componentDidMount(){
        this.findProducts();
       
    }


    findProducts = async () => {
        this.setState({ loading: true });
        try {
            const { data: productss } = await api.get("/product/category/" + this.props.match.params.id);
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

    redirect = (evt) => {
        let obj = evt.target;
        while (obj.id !== "card")
            obj = obj.parentNode;
        this.props.history.push(`/detail/${obj.children[1].innerHTML.toString()}`);
        window.location.reload();
    }
    

    render() {

        return (
            <>
                <Header history={this.props.history} location={this.props.location}/>
                <Container className="mb-6 ">
                     <Produtos history={this.props.history} products={this.state.products} />
                     
                </Container>
                <Footer />
            </>
        );
    } 
}