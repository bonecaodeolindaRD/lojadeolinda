import React, { Component } from 'react';

import Header from '../Header';

import {
    Container,
    Col,
    Row,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';




export default class CreateProduct extends Component {


    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            price: '',
            nameError: false,
            descriptionError: false,
            priceError: false,
            isOpen: false
        };
    }



    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };


    mySubmitHandler = (event) => {

        event.preventDefault();

        let { name, description, price } = this.state;

        if (name.length <= 3) {
            this.setState({ nameError: true });
            return false;
        } else {
            this.setState({ nameError: false });
        }

        alert(name + "" + description + "" + price);

        this.toggleModal();

    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }

    render() {
        return (
            <>
                <Header/>
                <Container className="border border-primary rounded mt-5 p-4">
                    <Form className="App" >
                        <FormGroup className="bg-warning rounded  p-2">
                            <Label>Cadastro de Produdos</Label>
                        </FormGroup>
                        <Row form>
                            <Col md={8}>
                                <FormGroup ref="myForm" className="myForm">
                                    <Label for="name">Nome do Produto*</Label>
                                    <Input type="text" ref="name" placeholder="Digite um novo produto" className="formField" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Descrição do produto*</Label>
                                    <Input type="textarea" ref="address" placeholder="Digite uma descrição..." className="formField" />
                                </FormGroup>
                                <p>*Campos obrigatórios</p>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="categoriaProduto">Categoria*</Label>
                                    <Input type="select" name="categoria" id="categoriaProduto">
                                        <option>-</option>
                                        <option>Atletas</option>
                                        <option>Jornalistas</option>
                                        <option>Politicos</option>
                                        <option>Personalizados</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="price">Link da imagem*</Label>
                                    <Input type="text" name="price" id="price" placeholder="Cole o link imagem aqui" className={`form-control ${this.state.priceError ? 'is-invalid' : null}`} onChange={this.myChangeHandler} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="price">Preço:*</Label>
                                    <Input type="text" name="price" id="price" placeholder="Digite o valor do produto" className={`form-control ${this.state.priceError ? 'is-invalid' : null}`} onChange={this.myChangeHandler} required />
                                </FormGroup>
                                <Button color="primary"
                                    outline type="submit"
                                    value="Enviar"  onClick={this.mySubmitHandler} className="myButton" >
                                    Adicionar
                                </Button>

                            </Col>
                        </Row>
                    </Form>

                </Container>

                <Modal isOpen={this.state.isOpen} >
                    <ModalHeader toggle={this.toggleModal}>Pronto!</ModalHeader>
                    <ModalBody>
                        Um novo produto foi adicionado.
                     </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={this.toggleModal}>OK</Button>
                    </ModalFooter>
                </Modal>



            </>
        );
    }


}
