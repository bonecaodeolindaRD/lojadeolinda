import React, { Component } from 'react';
import Header from '../Header';
import './styles.css';
import Footer from '../Footer';
import axios from 'axios';
import { Container } from 'reactstrap';

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: []
        }
        if (!sessionStorage.getItem('client')) {
            this.props.history.push('/');
            return;
        }
        this.getAddresses();
    }

    getAddresses = async () => {
        const { email } = JSON.parse(sessionStorage.getItem('client'));
        let { data: add } = await axios("http://localhost:8080/ecommerce/client/addresses/" + email);
        if (!add.addresses)
            return;
        this.setState({
            ...this.state,
            client: {
                ...this.state.client,
                addresses: add.addresses
            }
        });
        console.log(this.state.client.addresses);
    }

    getAddresses(e) {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <Header />
                {this.state.addresses ? (
                    <Container>

                    </Container>
                ): (
                    <Container className = "text-center">
                        <span className = "h2">Nenhum endereço encontrado!</span>
                    </Container >
                )
    }

                <div className="footer">
    <Footer />
</div>
            </>
        )
    }

}
export default Address;