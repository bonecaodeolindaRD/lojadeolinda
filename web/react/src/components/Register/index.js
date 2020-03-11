import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import api from "../../services/api";

import InputMask from 'react-input-mask';

import { Col, Form, FormGroup, Label, Input,Container  } from 'reactstrap';

class Register extends Component{
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);

        this.state = {
            NM_FIRSTNAME: "",
            NM_LASTNAME: "",
            EMAIL: "",
            CONTACT: "",

        }
    }

    onChangeName(e){
        this.setState({
            NM_FIRSTNAME: e.target.value
        })
    }

    onChangeLastName(e){
        this.setState({
            NM_LASTNAME: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            EMAIL: e.target.value
        })
    }

    onChangeContact(e){
        this.setState({
            CONTACT: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
          NM_FIRSTNAME: this.state.NM_FIRSTNAME,
          NM_LASTNAME: this.state.NM_LASTNAME,
          EMAIL: this.state.EMAIL,
          GEN: this.state.GEN,
          CONTACT: this.state.CONTACT,
        };
        api.post("/users", obj).then(res => console.log(res.data));

        this.setState({

        });
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
                <Form onSubmit={this.onSubmit} text-align-center >
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="nameUser">Nome: </Label>
                        <Col sm={5}>
                            <Input type="text" required name="nameUser" onChange={this.onChangeName} value={this.state.NM_FIRSTNAME} id="nameUser" placeholder="Seu primeiro nome"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="secNameUser">Sobrenome: </Label>
                        <Col sm={5}>
                            <Input type="text" required name="secNameUser" onChange={this.onChangeLastName} value={this.state.NM_LASTNAME} id="SecNameUser" placeholder="Seu sobrenome"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="Email">Email: </Label>
                        <Col sm={5}>
                            <Input type="email" required name="email" onChange={this.onChangeEmail} value={this.state.EMAIL} id="Email" placeholder="user@mail.com" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="contact">Contato: </Label>
                        <Col sm={5}>
                            <Input mask="(99) 99999-9999" required maskChar="" onChange={this.onChangeContact} value={this.state.CONTACT} tag={InputMask} type="text" name="contact" id="contact" placeholder="Ex (11) 99999-9999"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="password">Senha: </Label>
                        <Col sm={5}>
                            <Input  id="password" required type="password" name="password"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="confpassword">Confirmação: </Label>
                        <Col sm={5}>
                            <Input  id="confpassword" required type="password" name="confpassword"/>
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