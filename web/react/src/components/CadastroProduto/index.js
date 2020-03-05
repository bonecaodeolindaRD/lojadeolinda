import React, { Component } from 'react';
import { Nav, 
        Container, 
        Col, 
        Row, 
        Button, 
        Form, 
        FormGroup, 
        FormText, 
        Label, 
        Input,
        Modal, 
        ModalHeader, 
        ModalBody, 
        ModalFooter,
        FormFeedback 
    } from 'reactstrap';

// import { Container } from './styles';



export default class CadastroProduto extends Component {
    render() {
        return (
            <>
                <Nav className="navbar navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">Adicione um novo produto</a>
                </Nav>
                <Container className="border border-primary rounded mt-5 p-4">
                    <Form>
                        <FormGroup className="bg-warning rounded  p-2">
                            <Label>Cadastro de Produdos</Label>
                        </FormGroup>
                        <Row form>
                            <Col md={8}>
                                <FormGroup>
                                    <Label for="nomeProduto">Nome do Produto</Label>
                                    <Input invalid type="text" name="nomeProduto" id="nomeProduto" placeholder="Digite o nome do produto" />
                                    <FormFeedback>Digite algum produto!</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="descricaoProduto">Descrição do produto</Label>
                                    <Input type="textarea" name="descricaoProdut" id="descricaoProduto" />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="categoriaProduto">Categoria</Label>
                                    <Input type="select" name="categoria" id="categoriaProduto">
                                        <option>-</option>
                                        <option>Atletas</option>
                                        <option>Jornalistas</option>
                                        <option>Politicos</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="imagemProduto">Imagem</Label>
                                    <Input type="file" name="imagemProduto" id="imagemProduto" />
                                    <FormText color="muted">
                                        Insira a imagem do produto
                                </FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="precoProduto">Preço:</Label>
                                    <Input type="text" name="preco" id="precoProduto" placeholder="Digite o valor do produto" />
                                </FormGroup>
                                <Button color="primary" >Adicionar</Button>
                            </Col>

                        </Row>

                    </Form>
                </Container>
                
                
            </>
        );
    }
}
