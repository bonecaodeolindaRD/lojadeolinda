import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

import { 
    Container
} from 'reactstrap';


export default class SearchResult extends Component {

    constructor(props){
        super(props);
        this.state = {
            products: []
        }
        this.getResult();
    }

    getResult = async () => {
        const { data: products} = await axios("http://localhost:8080/ecommerce/product/find/" + this.props.match.params.product);
        this.setState({products});
    }



    render() {
        return (
            <>
            <Header history={this.props.history}/>
                {this.state.products.length > 0 ? (
                    <Container>

                    </Container>
                ) :
                (
                    <Container className="text-center">
                        <span className="h2">Nenhum produto encontrado</span>
                    </Container>
                )}
            </>
        )
    }
}
