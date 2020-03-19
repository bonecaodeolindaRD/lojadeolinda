import React, { Component } from 'react';
import axios from 'axios';

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


    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            category: 0,
            name: '',
            description: '',
            price: 2000.2,
            width: 1.0,
            heigth: 3.5,
            weigth: 15,
            image: '',
            error: ''
        };
        this.getCategories();
    }


    getCategories = async () => {
        const { data: category } = await axios("http://localhost:8080/ecommerce/category/all");
        if (!category)
            return;
        this.setState({ categories: category });
    }


    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };


    isEmpty = str => str.toString().trim().length <= 0; 

    validateFields = () => {

        if(!isNaN(this.state.price)){
            this.setState({error: "O preço deve ser um numero"});
            return false;
        }

        if(this.state.price <= 0){
            this.setState({error: "O preço não pode ser menor ou igual a zero"});
            return false;
        }

        if(!isNaN(this.state.width)){
            this.setState({error: "A largura deve ser um numero"});
            return false;
        }

        if(this.state.width <= 0){
            this.setState({error: "A largura não pode ser menor ou igual a zero"});
            return false;
        }

        if(!isNaN(this.state.heigth)){
            this.setState({error: "A altura deve ser um numero"});
            return false;
        }

        if(this.state.heigth <= 0){
            this.setState({error: "A altura não pode ser menor ou igual a zero"});
            return false;
        }

        if(!isNaN(this.state.weigth)){
            this.setState({error: "O peso deve ser um numero"});
            return false;
        }
        
        if(this.state.weigth <= 0){
            this.setState({error: "O peso não pode ser menor ou igual a zero"});
            return false;
        }

        if(this.isEmpty(this.state.name)){
            this.setState({error: "Preencha um nome para o produto"});
            return false;
        }

        if(this.isEmpty(this.state.name)){
            this.setState({error: "Preencha uma descrição para o produto"});
            return false;
        }

        if(this.state.category <= 0){
            this.state({error: "Selecione uma categoria"});
            return false;
        }

        return true;
    }

    createProduct = async () => {
        let obj = {

        }
        let {data: product} = await axios.post("http://localhost:8080/ecommerce/product/new", obj);
        if(!product){
            this.setState({error: "Erro ao adicionar o produto"});
        }
    }

    finish = (event) => {
        event.preventDefault();
        this.mySubmitHandler(event);
        if (this.validateFields())
            this.createProduct();
        console.log("teste");
    }

    render() {
        return (
            <>
                <Header />
                <Container className="border border-primary rounded mt-5 p-4">
                    <Form className="App" onSubmit={this.finish}>
                        <FormGroup className="bg-warning rounded  p-2">
                            <Label>Cadastro de Produdos</Label>
                        </FormGroup>
                        <Row form>
                            <Col md={8}>
                                <FormGroup ref="myForm" className="myForm">
                                    <Label for="name">Nome do Produto*</Label>
                                    <Input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} type="text" placeholder="Digite um novo produto" className="formField" required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Descrição do produto*</Label>
                                    <Input value={this.state.description} onChange={e => this.setState({ description: e.target.value })} type="textarea" ref="address" placeholder="Digite uma descrição..." className="formField" required />
                                </FormGroup>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="width">Largura*:</Label>
                                            <Input value={this.state.width} onChange={e => this.setState({width: e.target.value})} type="number" name="widht" id="width" placeholder="Apenas numeros decimais" required/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="heigth">Altura*:</Label>
                                            <Input value={this.state.heigth} onChange={e => this.setState({heigth: e.target.value})} type="number" name="heigth" id="heigth" placeholder="Apenas numeros decimais" required/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="weigth">Peso*:</Label>
                                            <Input value={this.state.weigth} onChange={e => this.setState({weigth: e.target.value})} type="number" name="weigth" id="weigth" placeholder="Apenas numeros decimais" required/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <p>*Campos obrigatórios</p>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="categoriaProduto">Categoria*</Label>
                                    <Input type="select" name="categoria" id="categoriaProduto" value={this.state.category} onChange={e => this.setState({category: e.target.value})}>
                                        <option value="0">-</option>
                                        {this.state.categories.map(c => (
                                            <option value={c.id}>{c.name}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="price">Link da imagem*</Label>
                                    <Input type="text" value={this.state.image} onChange={e => this.setState({ image: e.target.value })} name="price" id="price" placeholder="Cole o link imagem aqui" required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="price">Preço:*</Label>
                                    <Input value={this.state.price} onChange={e => this.setState({ price: e.target.value })} type="text" name="price" id="price" placeholder="Digite o valor do produto" required />
                                </FormGroup>
                                <span className="text-dange">{this.state.error}</span>
                                <Button color="primary"
                                    outline type="submit"
                                    value="Enviar" className="myButton" >
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
