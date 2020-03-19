import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './styles.css';

class OrderDetail extends Component{

    render(){
        return(
            <>
            <Header/>
            <div className="footer">
                <Footer/>
            </div>
            </>
        )
    }

}
export default OrderDetail;