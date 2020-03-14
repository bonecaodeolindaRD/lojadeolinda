import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './styles.css';
import InputMask from 'react-input-mask';

import { Col, Form, FormGroup, Label, Input,Container } from 'reactstrap';

import { Link } from 'react-router-dom';

class Account extends Component{
    state = {
        name: "",
        secName: "",
        email: "",
        contact: "",
        error: ""
    }

    loadAcccount (e){
        e.preventDefault();
    }

    render(){
        return(
            <>
            <Header/>
            <Container className="tam"  justify-content="center">
            <div className="text-align-center" align="center">
                <img src="img/user.png" width="100px" alt="logo do site" className="rounded-circle"/>
            </div>
            <br></br>
            <div className="text-align-center" align="center">
                <h1>Detalhes da Conta</h1>
            </div>
            <br></br>
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
                        <Label sm={1} for="secNameUser">Contato: </Label>
                        <Col sm={5}>
                            <Input mask="(99) 99999-9999" maskChar="" id="contact" tag={InputMask} type="text" name="contact"  placeholder="Ex (11) 99999-9999"/>
                        </Col>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <div className="text-align-center" align="center">
                            <button type="submit" className="btn btn-success mr-3" data-toggle="modal" data-target="#salvarDados"> Salvar </button>
                            <Link to="/"><button type="button" class="btn btn-danger">Cancelar</button></Link>
                        </div>
                    </FormGroup>
                </Form>
            </Container>
            <Footer/>
            </>
        )
    }
}

export default Account;