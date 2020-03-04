import React, { Component } from 'react';

import { Card, Button, CardTitle, CardText, Row, Col, Container, InputGroup, InputGroupText, InputGroupAddon, Input} from 'reactstrap';

class Login extends Component{
    render(){
        return (
            <>
            <Container align="center" justify-content="center">
            <Row>
      <Col xs="12" sm="6" md="6" >
        <Card body>
          <CardTitle>Login</CardTitle>
          <InputGroup>
          <InputGroupAddon addonType="prepend">
          <InputGroupText>Email: </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="user@mail.com" />
          </InputGroup>
          <br />
          <InputGroup>
          <InputGroupAddon addonType="prepend">
          <InputGroupText>Senha: </InputGroupText>
          </InputGroupAddon>
          <Input type="password" />
          </InputGroup>
          <div className="text-left">
          <a href="/Senha" className="alert-link">Perdeu a senha ?</a>
          </div>
          <br/>
          <div className="text-center">
              <Button size="md" color="success">Logar-se</Button>
              <Button size="md" className="ml-3" href="/" color="danger">Cancelar</Button>
          </div>
        </Card>
      </Col>
      <Col xs="12" sm="6" md="6">
        <Card body>
          <CardTitle>Cadastro</CardTitle>
          <CardText>Você não possui cadastro conosco ? Cadastre-se agora mesmo em nossa loja!</CardText>
          <Button href="/Cadastro">Cadastro</Button>
        </Card>
      </Col>
    </Row>
    </Container>
            </>
        )
    }

}

export default Login;