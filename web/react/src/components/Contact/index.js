import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col,
Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { FaEnvelopeSquare } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import './index.css';
import Header from '../Header';
import Footer from '../Footer';

export default class Contact extends Component {

    constructor() {
        super();
        this.state = {
          name: '',
          email: '',
          phone: '',
          message: '',
          nameError:false,
          emailError:false,
          phoneError:false,
          messageError:false,
          isOpen: false
        };
      }
      
      toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen });
      };

               
      mySubmitHandler = (event) => {

        event.preventDefault();

        let {name, email, phone, message} = this.state;

        if(name.length <= 3 ){
          this.setState({nameError: true});     
          return false;
        }else{
          this.setState({nameError: false});     
        }
               
        alert(name +" " + email + " " + phone + " " + message);
                               
        this.toggleModal();
      
        }
      
      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});     
      
      }
     
  render() {
    return (
              
    <>
    
    <Header/>

        <Form className="mt-5" id="form-contato" md="5" >

            <Col className="m-auto" md="5">

                <header className="card-header bg-warning mb-3">
                <FaEnvelopeSquare/> <a href="mailto:contato@lojadeolinda.com.br"> 
                        contato@lojadeolinda.com.br</a>
                </header>

                <FormGroup className="form-group required">
                    <Label  for="contatoNome" className="control-label">Nome Completo</Label>
                    <Input type="text" className={`form-control ${ this.state.nameError ? 'is-invalid':null }`} name="name" onChange={this.myChangeHandler} required
                        placeholder="Digite o seu nome completo"/>
                </FormGroup>

                <FormGroup className="form-group required">

                    <Label for="contatoEmail" className="control-label">E-mail</Label>
                    <Input  type="email" className={`form-control ${ this.state.emailError ?  'is-invalid':'null' }`} onChange={this.myChangeHandler} name="email" required
                        placeholder="Digite o seu e-mail"/>

                </FormGroup>

                <FormGroup className="form-group row required">
                    <Col className="col-6">
                        <Label for="contatoTel" className="control-label">Celular</Label>
                        <Input type="tel" mask="(99) 99999-9999"  tag={InputMask} className={`form-control ${ this.state.phoneError ?  'is-invalid':null }`} onChange={this.myChangeHandler} name="phone" required
                            placeholder="Ex (11) 99999-9999"/>
                    </Col>

                </FormGroup>

                <FormGroup className="form-group required">
                    <Label for="contatoMensagem" className="control-label">Mensagem</Label>
                    <Input  type="textarea" className={`form-control ${ this.state.messageError ?  'is-invalid': null }`} onChange={this.myChangeHandler} name="message" rows="6" required />
                </FormGroup>

                <FormText className="control-label-p mb-3">Campos obrigatórios</FormText>
               
                <FormGroup className="text-center">
                    <Button id="enviarContato" outline color="success" className="mr-2" onClick={this.mySubmitHandler}>Enviar</Button>
                    <Button type="reset" outline color="danger" >Limpar</Button>
                </FormGroup>

            </Col>

        </Form>
     
      <Modal isOpen={this.state.isOpen} >
        <ModalHeader toggle={this.toggleModal}>Fale Conosco</ModalHeader>
        <ModalBody>
            Entraremos em contato em até 24H
        </ModalBody>
        <ModalFooter>
          <Button outline color="secondary" onClick={this.toggleModal}>OK</Button>
        </ModalFooter>
      </Modal>

      <Footer/>

    </>
   
      
    );
  }
   
}
