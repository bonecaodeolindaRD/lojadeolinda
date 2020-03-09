import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';

import InputMask from 'react-input-mask';

import { Col, Form, FormGroup, Label, Input,Container  } from 'reactstrap';

class Register extends Component{

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
                <h1>Registro de Conta</h1>
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
                            <Input mask="(99) 99999-9999" maskChar="" tag={InputMask} type="text" name="contact" id="contact" placeholder="Ex (11) 99999-9999"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="password">Senha: </Label>
                        <Col sm={5}>
                            <Input  id="password" type="password" name="password"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="confpassword">Confirmação: </Label>
                        <Col sm={5}>
                            <Input  id="confpassword" type="password" name="confpassword"/>
                        </Col>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <div className="text-align-center" align="center">
                            <button type="submit" className="btn btn-success mr-3" data-toggle="modal" data-target="#salvarDados"> Salvar </button>
                            <button type="button" class="btn btn-danger" href="index.html">Cancelar</button>
                        </div>
                    </FormGroup>
                </Form>
            </Container>
            <Footer/>
            </>
        )
    }
  }

export default Register;