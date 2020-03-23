import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import InputMask from 'react-input-mask';
import { Container, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

class RegisterAddress extends Component {


    render() {
        return (
            <>
                <Header />
                <Container align="center">
                </Container>
                <Footer />
            </>
        )
    }
}

export default RegisterAddress;