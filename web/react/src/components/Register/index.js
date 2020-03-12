import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import api from "../../services/api";

import InputMask from 'react-input-mask';

import { Col, Form, FormGroup, Label, Input,Container  } from 'reactstrap';

class Register extends Component{
    state = {
        NAME: '',
        CPF: '',
        EMAIL: '',
        CONTACT: '',
        PASSWORD: ''
      }

    onChangeNome = event => {
        this.setState({ NAME: event.target.value });
    }

    onChangeCPF = event =>{
        this.setState({ CPF: event.target.value });
    }

    onChangeEmail = event =>{
        this.setState({ EMAIL: event.target.value });
    }

    onChangeContact = event =>{
        this.setState({ CONTACT: event.target.value });
    }

    onChangePassword = event =>{
        this.setState({ PASSWORD: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

    const user = {
      NAME: this.state.NAME,
      CPF: this.state.CPF,
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
  testCPF = (strCPF) => {
    let soma;
    let resto;
    let cpf = ""

    for (let i = 0; i < strCPF.toString().length; i++) {
        let char = strCPF.substring(i, i + 1);
        if (char !== "." && char !== "-")
            cpf += char;
    }
    soma = 0;
    if (cpf === "00000000000")
        return false;

    for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;



    if ((resto === 10) || (resto === 11))
        resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10)))
        return false;



    soma = 0;
    for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11))
        resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11)))
        return false;

    return true;
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
                            <Input type="text" required name="NAME" onChange={this.onChangeNome} id="NAME" placeholder="Seu nome completo"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="CPF">CPF: </Label>
                        <Col sm={5}>
                            <Input mask="999.999.999-99" tag={InputMask} type="text" required name="CPF" onChange={this.onChangeCPF} id="CPF" placeholder="Ex 999.999.999-99"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="EMAIL">Email: </Label>
                        <Col sm={5}>
                            <Input type="email" required name="EMAIL" onChange={this.onChangeEmail}  id="EMAIL" placeholder="Ex user@mail.com" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="CONTACT">Contato: </Label>
                        <Col sm={5}>
                            <Input mask="(99) 99999-9999" required maskChar="" onChange={this.onChangeContact} tag={InputMask} type="text" name="CONTACT" id="CONTACT" placeholder="Ex (11) 99999-9999"/>
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
                            <Input  id="PASSWORD" onChange={this.onChangePassword}  required type="password" name="PASSWORD"/>
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