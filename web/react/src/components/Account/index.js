import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './styles.css';

import { Col, Row, Button, Form, FormGroup, Label, Input,Container } from 'reactstrap';

class Account extends Component{
    render(){
        return(
            <>
            <Header/>
            <Container className="tam"  justify-content="center">
                <Form>
                    <Row form>
                        <Col md={2}></Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="user@mail.com" />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="examplePassword">Senha</Label>
                                <Input type="password" name="password" id="examplePassword" />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Footer/>
            </>
        )
    }
}

export default Account;