import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col} from 'reactstrap';
import { FaEnvelopeSquare } from 'react-icons/fa';
import './index.css';

export default class Contact extends Component {

   
  render() {
    return (
      
        <Form className="mt-5" id="form-contato" md="5">

            <Col className="m-auto" md="5">

                <header className="card-header bg-warning mb-3">
                <FaEnvelopeSquare/> <a href="mailto:contato@lojadeolinda.com.br"> 
                        contato@lojadeolinda.com.br</a>
                </header>

                <FormGroup className="form-group required">
                    <Label  for="contatoNome" className="control-label">Nome Completo</Label>
                    <Input  type="text" className="form-control" id="contatoNome" name="contatoNome" required
                        placeholder="Digite o seu nome completo"/>
                </FormGroup>

                <FormGroup className="form-group required">

                    <Label for="contatoEmail" className="control-label">E-mail</Label>
                    <Input  type="email" className="form-control" id="contatoEmail" name="contatoEmail" required
                        placeholder="Digite o seu e-mail"/>

                </FormGroup>

                <FormGroup className="form-group row required">
                    <Col className="col-6">
                        <Label for="contatoTel" className="control-label">Telefone</Label>
                        <Input type="tel" className="form-control" id="contatoTel" name="contatoTel" required
                            placeholder="DDD + Número"/>
                    </Col>

                </FormGroup>

                <FormGroup className="form-group required">
                    <Label for="contatoMensagem" className="control-label">Mensagem</Label>
                    <Input  type="textarea" name="contatoMensagem" id="contatoMensagem" rows="6" required />
                </FormGroup>

                <FormText className="control-label-p mb-3">Campos obrigatórios</FormText>
               
                <FormGroup className="text-center">
                    <Button id="enviarContato" type="submit" outline color="success" className="mr-2">Enviar</Button>
                    <Button type="reset" outline color="danger" >Limpar</Button>
                </FormGroup>

            </Col>

        </Form>
      
    );
  }
   
}
