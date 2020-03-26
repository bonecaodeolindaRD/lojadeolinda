import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Col, Form, FormGroup, Label, Input, Container, Card, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';

export default class EditAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            contact: "",
            cpf: "",
            error: "",
            birth: ""
        }
        if (!sessionStorage.getItem('client')) {
            this.props.history.push('/');
            return;
        }
    }
    render() {
        return (
            <>
                <Header />
                <Container className="tam mb-2" justify-content="center">
                    <div className="text-align-center" align="center">
                        <img src="img/user.png" width="100px" alt="logo do site" className="rounded-circle" />
                    </div>
                    <br></br>
                    <Form>
                        <Card className="p-2">
                            <div className="text-align-center" align="center">
                                <h1>Editar Conta</h1>
                            </div>
                            <br></br>
                            <FormGroup row>
                                <Col md="4"></Col>
                                <Col md={4} sm={4}>
                                    <Label for="nameUser"><span className="text-danger">*</span>Nome Completo:</Label>
                                    <Input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} type="text" name="nameUser" id="nameUser" placeholder="Seu primeiro nome" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4"></Col>
                                <Col md={4} sm={4}>
                                    <Label for="birth"><span className="text-danger">*</span>Data de Nascimento:</Label>
                                    <Input value={this.state.birth} onChange={e => this.setState({ birth: e.target.value })} type="date" name="birth" id="birth" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4"></Col>
                                <Col md={4} sm={4}>
                                    <Label for="email"><span className="text-danger">*</span>Email:</Label>
                                    <Input value={this.state.email} onChange={e => this.setState({ name: e.target.value })} type="email" name="email" id="Email" placeholder="user@mail.com" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4"></Col>
                                <Col md={4} sm={4}>
                                    <Label for="cpf"><span className="text-danger">*</span>CPF:</Label>
                                    <Input value={this.state.cpf} disabled onChange={e => this.setState({ cpf: e.target.value })} mask="999.999.999-99" maskChar="" id="cpf" tag={InputMask} type="text" name="cpf" placeholder="" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4"></Col>
                                <Col md={4} sm={4}>
                                    <Label for="contact"><span className="text-danger">*</span>Contato:</Label>
                                    <Input value={this.state.contact} onChange={e => this.setState({ name: e.target.value })} mask="(99) 99999-9999" maskChar="" id="contact" tag={InputMask} type="text" name="contact" placeholder="Ex (11) 99999-9999" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <div className="text-align-center m-2" align="center">
                                    <Link to="/account"><Button className="mr-3" color="danger">Cancelar</Button></Link>
                                    <Link to="/editaccount"><Button type="submit" color="success">Salvar Dados</Button></Link>
                                </div>
                            </FormGroup>
                        </Card>
                    </Form>
                </Container>
                <br />
                <br />
                <br />
                <Footer />
            </>
        )
    }
}
