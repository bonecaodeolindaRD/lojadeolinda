import React, { Component } from 'react';
import Header from '../Header';
import './styles.css';
import Footer from '../Footer';
import axios from 'axios';

class Address extends Component {
    constructor(props){
        super(props);
        this.state = {
            addresses: []
        }
        if (!sessionStorage.getItem('client')) {
            this.props.history.push('/');
            return;
        }
        this.loadAcccount();
        console.log(this.addresses)
    }

    loadAcccount = async () => {
        let { email } = JSON.parse(sessionStorage.getItem('client'));
        let { data: response } = await axios("http://localhost:8080/ecommerce/client/addresses/" + email);
        this.setState({
            addresses: response.addresses
        })
    }

    loadAcccount(e) {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <Header />

                <div className="footer">
                    <Footer/>
                </div>
            </>
        )
    }

}
export default Address;