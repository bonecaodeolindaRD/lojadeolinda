import React, { Component } from 'react';

import { Card, Form , Button, CardTitle, CardText, Row, Col, Container, InputGroup, InputGroupText, InputGroupAddon, Input} from 'reactstrap';

import { withRouter, Link } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";

import './styles.css';
import Header from '../Header';
import Footer from '../Footer';

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
            "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }
  };

    render(){
        return (
            <>
            <Header/>
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
                        <a href="/password" className="alert-link">Lembrar Senha</a>
                      </div>
                      <br/>
                  <div className="text-center">
                      <Button size="md" type="submit" color="success">Logar-se</Button>
                      <Link to="/"><Button size="md" className="ml-3" color="danger">Cancelar</Button></Link>
                  </div>
                  </Form>
                </Card>
                  </Col>
                    <Col xs="12" sm="6" md="6">
                  <Card body>
                    <CardTitle>Cadastro</CardTitle>
                    <CardText>Você não possui cadastro conosco ? Cadastre-se agora mesmo em nossa loja!</CardText>
                    <Link to="/register"><Button to="/register">Cadastro</Button></Link>
                  </Card>
                </Col>
              </Row>
            </Container>
            <Footer></Footer>
          </>
        )
    }

}

export default withRouter(Login);