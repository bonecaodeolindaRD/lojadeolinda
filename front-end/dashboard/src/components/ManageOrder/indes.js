import React, { Component } from 'react';
import Header from '../Header';
import { Container, Form, InputGroup, Label, Input, FormGroup, Col, Row, Button } from 'reactstrap';


export default class ManageOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Header />
                <Container className="mt-5">
                    <Form className="border p-2">
                        <Row>
                            <Col xs="3">
                                <FormGroup>
                                    <Label for="ordernumber">Numero do pedido</Label>
                                    <InputGroup><Input type="text" id="ordernumber" name="ordernumber" placeholder="Numero do pedido"/><Button type="submit">Buscar</Button></InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
        );
    }
}
