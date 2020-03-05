import React, { Component } from 'react';
import { Container, Col, Row, Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';

// import { Container } from './styles';

export default class CadastroProduto extends Component {
    render() {
        return (
            <Container className="border border-primary rounded mt-5 p-4">
                <Form>
                    <FormGroup className="bg-warning rounded  p-2">
                        <Label>Cadastro de Produdos</Label>
                    </FormGroup>
                    <Row form>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="exampleEmail">Nome do Produto</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Digite o nome do produto" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Descrição do produto</Label>
                                <Input type="textarea" name="text" id="exampleText" />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleSelect">Categoria</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>-</option>
                                    <option>Atletas</option>
                                    <option>Jornalistas</option>
                                    <option>Politicos</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">Imagem</Label>
                                <Input type="file" name="file" id="exampleFile" />
                                <FormText color="muted">
                                    Insira a imagem do produto
                                </FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleZip">Preço:</Label>
                                <Input type="text" name="zip" id="exampleZip" placeholder="Digite o valor do produto" />
                            </FormGroup>
                            <Button  color="primary" >Adicionar</Button>
                        </Col>

                    </Row>

                </Form>
            </Container>
        );
    }
}
