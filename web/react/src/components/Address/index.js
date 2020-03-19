import React, { Component } from 'react';
import Header from '../Header';
import './styles.css';
import Footer from '../Footer';

class Address extends Component {
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