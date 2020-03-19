import React, { Component } from 'react';

import {
    Container
} from 'reactstrap';

import Produtos from '../Products';
import Carrossel from '../Carrossel';
import Header from '../Header';
import Footer from '../Footer';

export default class Home extends Component {


    render() {

        return (
            <>
                <Header history={this.props.history} location={this.props.location}/>
                <Container>
                    <Carrossel />
                    <Produtos history={this.props.history}/>
                </Container>
                <Footer />
            </>
        );
    }
}