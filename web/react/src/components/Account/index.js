import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './styles.css';
import InputMask from 'react-input-mask';

import { Col, Row, Button, Form, FormGroup, Label, Input,Container } from 'reactstrap';

class Account extends Component{
    render(){
        return(
            <>
            <Header/>
            <Container className="tam"  justify-content="center">
                <Form text-align-center >
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="nameUser">Nome: </Label>
                        <Col sm={5}>
                            <Input type="text" name="nameUser" id="nameUser" placeholder="Seu primeiro nome"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="secNameUser">Sobrenome: </Label>
                        <Col sm={5}>
                            <Input type="text" name="secNameUser" id="SecNameUser" placeholder="Seu sobrenome"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="Email">Email: </Label>
                        <Col sm={5}>
                            <Input type="email" name="email" id="Email" placeholder="user@mail.com" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label for="exampleSelect" sm={1}>Gênero: </Label>
                            <Col sm={5}>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option disable onSelect></option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="outros">Outros</option>
                                </Input>
                            </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="secNameUser">Contato: </Label>
                        <Col sm={5}>
                            <Input mask="(99) 99999-9999" maskChar="" id="cep" tag={InputMask} type="text" name="contact" id="contact" placeholder="Ex (11) 99999-9999"/>
                        </Col>
                    </FormGroup>
                </Form>
            </Container>
            <Footer/>
            </>
        )
    }
}

export default Account;