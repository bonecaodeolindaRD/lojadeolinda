import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import api from "../../services/api";

import InputMask from 'react-input-mask';

import { Col, Form, FormGroup, Label, Input,Container  } from 'reactstrap';

class Register extends Component{
    state = {
        NAME: '',
        EMAIL: '',
        CONTACT: '',
        PASSWORD: ''
      }

    handleChange = event => {
        this.setState({ NAME: event.target.value });
        this.setState({ EMAIL: event.target.value });
        this.setState({ CONTACT: event.target.value });
        this.setState({ PASSWORD: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

    const user = {
      NAME: this.state.NAME,
      EMAIL: this.state.EMAIL,
      CONTACT: this.state.CONTACT,
      PASSWORD: this.state.PASSWORD
    };

    api.post("/client", { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
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
                <h1>Registro de Conta</h1>
            </div>
            <br></br>
                <Form onSubmit={this.handleSubmit} text-align-center >
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="NAME">Nome: </Label>
                        <Col sm={5}>
                            <Input type="text" required name="NAME" onChange={this.handleChange} id="NAME" placeholder="Seu nome completo"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="EMAIL">Email: </Label>
                        <Col sm={5}>
                            <Input type="email" required name="EMAIL" onChange={this.handleChange}  id="EMAIL" placeholder="user@mail.com" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="CONTACT">Contato: </Label>
                        <Col sm={5}>
                            <Input mask="(99) 99999-9999" required maskChar="" onChange={this.handleChange} tag={InputMask} type="text" name="CONTACT" id="CONTACT" placeholder="Ex (11) 99999-9999"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="1password">Senha: </Label>
                        <Col sm={5}>
                            <Input  id="1password" required type="password" name="1password"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="PASSWORD">Confirmação: </Label>
                        <Col sm={5}>
                            <Input  id="PASSWORD" onChange={this.handleChange}  required type="password" name="PASSWORD"/>
                        </Col>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <div className="text-align-center" align="center">
                            <button type="submit" className="btn btn-success mr-3" > Salvar </button>
                            <button type="button" class="btn btn-danger" to="index.html">Cancelar</button>
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