import React, { Component } from 'react';
import axios from 'axios';
import {
  Button, Form, FormGroup, Label, Input, FormText, Col,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { FaEnvelopeSquare } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import './index.css';
import Header from '../Header';
import Footer from '../Footer';

export default class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '',
      nameError: false,
      emailError: false,
      phoneError: false,
      messageError: false,
      isOpen: false
    };

    if (!sessionStorage.getItem('client')) {
      return;
    }
    this.loadAcccount();
  }


  loadAcccount = async () => {
    let { email } = JSON.parse(sessionStorage.getItem('client'));
    let { data: account } = await axios("http://localhost:8080/ecommerce/client/email/" + email);
    this.setState({
      name: account.name,
      email: account.email,
      phone: account.phoneNumber
    })
  }

  loadAcccount(e) {
    e.preventDefault();
  }


  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  submit = () => {
    this.reset();
    this.toggleModal();
  }

  reset = () => {
    this.setState({ name: '', email: '', phone: '', message: '' });
  }


  mySubmitHandler = (event) => {

    event.preventDefault();

    let { name, email, phone, message } = this.state;


    if (name.length <= 3 || this.isName(name)) {
      this.setState({ nameError: true });
      return false;
    } else {
      this.setState({ nameError: false });
    }

    if (email.length === 0) {
      this.setState({ emailError: true });
      return false;
    } else {
      this.setState({ emailError: false });
    }

    if (phone.length === 0) {
      this.setState({ phoneError: true });
      return false;
    } else {
      this.setState({ phoneError: false });
    }

    if (message.length === 0) {
      this.setState({ messageError: true });
      return false;
    } else {
      this.setState({ messageError: false });
    }

    this.toggleModal();

  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });

  }

  isPhone = (phone) => {

    let re = /^\+?\d{2}?\s*\(\d{2}\)?\s*\d{4}-\d{4}$/;

    return !re.test(phone);

  }

  isName = (name) => {

    let re = /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ\-\\ \s]+$/;
    return !re.test(name);

  };


  render() {
    return (

      <>

        <Header history={this.props.history} location={this.props.location} />


        <Form className="mt-5" id="form-contato" md="5" onSubmit={this.mySubmitHandler}>

          <Col className="m-auto" md="5">

            <header className="card-header bg-warning mb-3">
              <FaEnvelopeSquare /> <a href="mailto:contato@lojadeolinda.com.br">
                contato@bonecaodeolinda.com.br</a>
            </header>

            <FormGroup className="form-group required">
              <Label for="contatoNome" className="control-label">Nome Completo</Label>
              <Input type="text" className={`form-control ${this.state.nameError ? 'is-invalid' : null}`} name="name" onChange={this.myChangeHandler} value={this.state.name} pattern="[A-Za-z\s]+$" required
                placeholder="Digite o seu nome completo" />
            </FormGroup>

            <FormGroup className="form-group required">

              <Label for="contatoEmail" className="control-label">E-mail</Label>
              <Input type="email" className={`form-control ${this.state.emailError ? 'is-invalid' : 'null'}`} onChange={this.myChangeHandler} name="email" value={this.state.email} required
                placeholder="Digite o seu e-mail" />

            </FormGroup>

            <FormGroup className="form-group row required">
              <Col className="col-6">
                <Label for="contatoTel" className="control-label">Celular</Label>
                <Input type="tel" mask="(99) 99999-9999" tag={InputMask} className={`form-control ${this.state.phoneError ? 'is-invalid' : null}`} value={this.state.phone} onChange={this.myChangeHandler} pattern="(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})" name="phone" required
                  placeholder="Ex (11) 99999-9999" />
              </Col>

            </FormGroup>

            <FormGroup className="form-group required">
              <Label for="contatoMensagem" className="control-label">Mensagem</Label>
              <Input type="textarea" className={`form-control ${this.state.messageError ? 'is-invalid' : null}`} onChange={this.myChangeHandler} value={this.state.message} name="message" rows="6" required />
            </FormGroup>

            <FormText className="control-label-p mb-3">Campos obrigatórios</FormText>

            <FormGroup className="text-center">
              <Button id="enviarContato" color="success" className="mr-2" >Enviar</Button>
              <Button onClick={this.reset} color="danger" >Limpar</Button>
            </FormGroup>

          </Col>

        </Form>

        <Modal isOpen={this.state.isOpen} >
          <ModalHeader toggle={this.toggleModal}>Fale Conosco</ModalHeader>
          <ModalBody>
            Entraremos em contato em até 24H
        </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.submit}>OK</Button>
          </ModalFooter>
        </Modal>

        {/* <div className="fixed-bottom"> */}
          <Footer />
        {/* </div> */}

      </>
    );
  }

}