import React, { Component } from 'react';

import { Card, Form , Button, CardTitle, CardText, Row, Col, Container, InputGroup, InputGroupText, InputGroupAddon, Input} from 'reactstrap';

import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";

import './styles.css';

class Login extends Component{
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/sessions", { email, password });
        login(response.data.token);
        this.props.history.push("/account");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

    render(){
        return (
            <>
            <Container className="tam" align="center" justify-content="center">
            <Row className="tam align-items-center">
              <Col xs="12" sm="6" md="6" >
                <Card body>
                <Form onSubmit={this.handleSignIn}>
                  <CardTitle>Login</CardTitle>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><img src="img/person.svg" alt="logo do site" width="20px" /> Email: </InputGroupText>
                      </InputGroupAddon>
                        <Input id="email" onChange={e => this.setState({ email: e.target.value })} placeholder="user@mail.com" />
                      </InputGroup>
                      <br />
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><img src="img/key.svg" alt="logo do site" width="20px" /> Senha: </InputGroupText>
                      </InputGroupAddon>
                        <Input id="password" onChange={e => this.setState({ password: e.target.value })} type="password" />
                    </InputGroup>
                      <div className="text-left">
                        <a href="/Senha" className="alert-link">Lembrar senha</a>
                      </div>
                      <br/>
                  <div className="text-center">
                      <Button size="md" type="submit" color="success">Logar-se</Button>
                      <Button size="md" className="ml-3" href="/" color="danger">Cancelar</Button>
                  </div>
                  </Form>
                </Card>
                  </Col>
                    <Col xs="12" sm="6" md="6">
                  <Card body>
                    <CardTitle>Cadastro</CardTitle>
                    <CardText>Você não possui cadastro conosco ? Cadastre-se agora mesmo em nossa loja!</CardText>
                    <Button href="/register">Cadastro</Button>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
        )
    }

}

export default withRouter(Login);