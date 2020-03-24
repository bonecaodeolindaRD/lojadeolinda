import React, { Component } from 'react';
import './styles.css';
import {
    Col,
    Row,
    Form,
    Card,
    CardTitle,
    InputGroup,
    Input,
    InputGroupAddon,
    Button,
    InputGroupText,
    Container
} from 'reactstrap';



export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        }
    }

    handleSignIn = () => {

    }

    render() {
        return (
            <>
                <Row fluid className="d-flex justify-content-center centralize">
                        <Col md={4}>
                            <Card body>
                                <Form onSubmit={this.handleSignIn}>
                                    <CardTitle>Login</CardTitle>
                                    <p className="text-danger">{this.state.error}</p>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><img src="img/person.svg" alt="logo do site" width="20px" /> Usuario: </InputGroupText>
                                        </InputGroupAddon>
                                        <Input id="email" onChange={e => this.setState({ user: e.target.value })} placeholder="user@mail.com" />
                                    </InputGroup>
                                    <br />
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><img src="img/key.svg" alt="logo do site" width="20px" /> Senha: </InputGroupText>
                                        </InputGroupAddon>
                                        <Input id="password" onChange={e => this.setState({ password: e.target.value })} type="password" />
                                    </InputGroup>
                                    <br />
                                    <div className="text-center">
                                        <Button size="md" type="submit" color="success">Logar-se</Button>
                                    </div>
                                </Form>
                            </Card>
                        </Col>
                </Row>
            </>
        )
    }
}
