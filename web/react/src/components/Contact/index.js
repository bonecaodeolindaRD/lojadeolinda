import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col,
Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { FaEnvelopeSquare } from 'react-icons/fa';
import './index.css';

export default class Contact extends Component {

    constructor(props) {
        super(props);
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

    
    //   validateName = () => {
    //     const { name } = this.state;
    //     this.setState({
    //       nameError:
    //         name.length < 3 ? true : false
    //     });
    //   }

           
      mySubmitHandler = (event) => {
        event.preventDefault();
        //const { name } = this.state;
              
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
        <Form className="mt-5" id="form-contato" md="5" onSubmit={this.mySubmitHandler}>

            <Col className="m-auto" md="5">

                <header className="card-header bg-warning mb-3">
                <FaEnvelopeSquare/> <a href="mailto:contato@lojadeolinda.com.br"> 
                        contato@lojadeolinda.com.br</a>
                </header>

                <FormGroup className="form-group required">
                    <Label  for="contatoNome" className="control-label">Nome Completo</Label>
                    <Input  type="text" className={`form-control ${ this.state.nameError ? 'is-valid':'is-invalid' }`} onChange={this.myChangeHandler} id="contatoNome" name="contatoNome" required
                        placeholder="Digite o seu nome completo"/>
                </FormGroup>

                <FormGroup className="form-group required">

                    <Label for="contatoEmail" className="control-label">E-mail</Label>
                    <Input  type="email" className={`form-control ${ this.state.emailError ? 'is-valid':'is-invalid' }`} onChange={this.myChangeHandler} id="contatoEmail" name="contatoEmail" required
                        placeholder="Digite o seu e-mail"/>

                </FormGroup>

                <FormGroup className="form-group row required">
                    <Col className="col-6">
                        <Label for="contatoTel" className="control-label">Telefone</Label>
                        <Input type="tel" className={`form-control ${ this.state.phoneError ? 'is-valid':'is-invalid' }`} onChange={this.myChangeHandler} id="contatoTel" name="contatoTel" required
                            placeholder="DDD + Número"/>
                    </Col>

                </FormGroup>

                <FormGroup className="form-group required">
                    <Label for="contatoMensagem" className="control-label">Mensagem</Label>
                    <Input  type="textarea" className={`form-control ${ this.state.messageError ? 'is-valid':'is-invalid' }`} onChange={this.myChangeHandler} id="contatoMensagem" rows="6" required />
                </FormGroup>

                <FormText className="control-label-p mb-3">Campos obrigatórios</FormText>
               
                <FormGroup className="text-center">
                    <Button id="enviarContato" type="submit" outline color="success" className="mr-2">Enviar</Button>
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

    </>
   
      
    );
  }
   
}
