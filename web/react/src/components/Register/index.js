import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import axios from "axios";
import InputMask from "react-input-mask";
import AlertEvent from "./alerterror";
import AlertPass from "./passerror";

import { Col, Form, FormGroup, Label, Input, Container } from 'reactstrap';

class Register extends Component {
    constructor(props) {
        super(props);
        if(sessionStorage.getItem('client'))
            this.props.history.push('/');

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCPF = this.onChangeCPF.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeBirth = this.onChangeBirth.bind(this);

        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            alert_message: '',
            alert_pass: '',
            error: null,
            CPF: '',
            EMAIL: '',
            NAME: '',
            PASSWORD: '',
            PASS_CONF: '',
            PHONENUMBER: '',
            BIRTH: ''
        }
    }

    onChangeName = event => {
        this.setState({ NAME: event.target.value });
    }

    onChangeCPF = event => {
        this.setState({ CPF: event.target.value });
    }

    onChangeEmail = event => {
        this.setState({ EMAIL: event.target.value });
    }

    onChangeContact = event => {
        this.setState({ PHONENUMBER: event.target.value });
    }

    onChangeConfPass= event => {
        this.setState({ PASS_CONF: event.target.value });
    }

    onChangePassword = event => {
        this.setState({ PASSWORD: event.target.value });
    }

    onChangeBirth = event => {
        this.setState({ BIRTH: event.target.value });
    }

    redirectHome = () => {

        this.props.history.push("/");
        
    }


    handleSubmit = async event => {

        event.preventDefault();

        let cpf = this.state.CPF;
        cpf = cpf.replace(".","").replace("-","").replace(" ","").replace(".","").trim();

        let phone = this.state.PHONENUMBER
        phone = phone.replace(")","").replace("(","").replace("-","").replace(" ","").trim();

        const user = {
            cpf: cpf,
            email: this.state.EMAIL.trim(),
            name: this.state.NAME.trim().toUpperCase(),
            birthday: this.state.BIRTH,
            password: this.state.PASSWORD,
            phoneNumber: phone,
            pass_conf: this.state.PASS_CONF,
        };

        if(this.state.PASSWORD === this.state.PASS_CONF){
            try {
                await axios.post("http://localhost:8080/ecommerce/client/new", user);
                this.setState({
                    cpf: "",
                    name: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    birth:""
                })
                this.props.history.push("/login");
            } catch (error) {
                this.setState({alert_message: "error" })
              
            }
        } else {
            this.setState({alert_pass: "error" })
        }
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

    render() {
        return (
            <>
                <Header history={this.props.history} location={this.props.location}/>
                <Container className="tam" justify-content="center">
                    <div className="text-align-center" align="center">
                        <img src="img/user.png" width="100px" alt="logo do site" className="rounded-circle" />
                    </div>
                    <br></br>
                    <div className="text-align-center" align="center">
                        <h1>Registro de Conta</h1>
                    </div>
                    <div className="text-align-center" align="center">
                    {this.state.alert_message==="error"?<AlertEvent/>: null}
                    {this.state.alert_pass==="error"?<AlertPass/>: null}
                    </div>
                    <br></br>
                    <Form onSubmit={this.handleSubmit} text-align-center >
                        <FormGroup row>
                            <Col sm={3}></Col>
                            <Label sm={1} for="NAME">Nome: </Label>
                            <Col sm={5}>
                                <Input type="text" required name="NAME" onChange={this.onChangeName} id="NAME" defaultValue={this.state.name} pattern="[A-Za-z\s]+$" placeholder="Seu nome completo" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}></Col>
                            <Label sm={2} for="BIRTH">Data de Nascimento: </Label>
                            <Col sm={4}>
                                <Input type="date"  name="BIRTH" onChange={this.onChangeBirth} id="BIRTH" defaultValue={this.state.BIRTH} required />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}></Col>
                            <Label sm={1} for="CPF">CPF: </Label>
                            <Col sm={5}>
                                <Input mask="999.999.999-99" tag={InputMask} type="text" required name="CPF" onChange={this.onChangeCPF} defaultValue={this.state.cpf} id="CPF" placeholder="Ex 999.999.999-99" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}></Col>
                            <Label sm={1} for="EMAIL">Email: </Label>
                            <Col sm={5}>
                                <Input type="email" required name="EMAIL" onChange={this.onChangeEmail} id="EMAIL" placeholder="Ex user@mail.com" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}></Col>
                            <Label sm={1} for="CONTACT">Contato: </Label>
                            <Col sm={5}>
                                <Input mask="(99) 99999-9999" required maskChar="" onChange={this.onChangeContact} tag={InputMask} type="text" name="CONTACT" id="CONTACT" pattern="(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})" placeholder="Ex (11) 99999-9999" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}></Col>
                            <Label sm={1} for="pass_conf">Senha: </Label>
                            <Col sm={5}>
                                <Input id="pass_conf" onChange={this.onChangeConfPass} required type="password" name="pass_conf" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}></Col>
                            <Label sm={1} for="PASSWORD">Confirmação: </Label>
                            <Col sm={5}>
                                <Input id="PASSWORD" onChange={this.onChangePassword} required type="password" name="PASSWORD" />
                            </Col>
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <div className="text-align-center" align="center">
                                <button type="submit" className="btn btn-success mr-3" > Salvar </button>
                                <button type="button" className="btn btn-danger" onClick={this.redirectHome}>Cancelar</button>
                            </div>
                        </FormGroup>
                    </Form>
                </Container>
                <Container><div></div></Container>
                <Footer />
            </>
        )
    }
}

export default Register;