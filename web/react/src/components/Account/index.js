import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import './styles.css';
import InputMask from 'react-input-mask';

import { Col, Form, FormGroup, Label, Input,Container } from 'reactstrap';

import { Link } from 'react-router-dom';

class Account extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            contact: "",
            cpf: "",
            error: ""
        }
        if(!sessionStorage.getItem('client')){
            this.props.history.push('/');
            return;
        }
        this.loadAcccount();
    }
   
    loadAcccount = async () => {
        let { email } = JSON.parse(sessionStorage.getItem('client'));
        let { data : account} = await axios("http://localhost:8080/ecommerce/client/email/" + email);
        this.setState({
            name : account.name,
            email : account.email,
            contact : account.phoneNumber,
            cpf: account.cpf
        })
    }

    loadAcccount (e){
        e.preventDefault();
    }

    render(){
        return(
            <>
            <Header history={this.props.history} location={this.props.location}/>
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
                            <Input value={this.state.name} disabled onChange={e => this.setState({name: e.target.value})} type="text" name="nameUser" id="nameUser" placeholder="Seu primeiro nome"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="Email">Email: </Label>
                        <Col sm={5}>
                            <Input value={this.state.email} disabled onChange={e => this.setState({name: e.target.value})} type="email" name="email" id="Email" placeholder="user@mail.com" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="secNameUser">CPF: </Label>
                        <Col sm={5}>
                            <Input value={this.state.cpf} disabled onChange={e => this.setState({cpf: e.target.value})} mask="999.999.999-99" maskChar="" id="cpf" tag={InputMask} type="text" name="cpf"  placeholder=""/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}></Col>
                        <Label sm={1} for="secNameUser">Contato: </Label>
                        <Col sm={5}>
                            <Input value={this.state.contact} disabled onChange={e => this.setState({name: e.target.value})} mask="(99) 99999-9999" maskChar="" id="contact" tag={InputMask} type="text" name="contact"  placeholder="Ex (11) 99999-9999"/>
                        </Col>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <div className="text-align-center" align="center">
                            <Link to="/"><button type="button" class="btn btn-danger">Voltar ao Início</button></Link>
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