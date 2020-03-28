import React, { Component } from 'react';
import api from '../../services/api';

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
    InputGroup
} from 'reactstrap';




export default class CreateProduct extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            categories: [],
            category: 0,
            name: '',
            description: '',
            price: 2000.2,
            width: 1.0,
            heigth: 3.5,
            weigth: 15,
            off: 5,
            image: '',
            error: '',
            newCategory: '',
            categoryMessage: '',
        };
        if(!sessionStorage.getItem('user')){
            this.props.history.push("/");
            return;
        }
        this.existentUser();
        this.existentUser();
        this.getCategories();
    }

    existentUser = async () => {
        try {
            let { username } = JSON.parse(sessionStorage.getItem('user'));
            let user = await api.get("/employee/" + username);
            if (!user) {
                sessionStorage.removeItem('dG9rZW4=');
                sessionStorage.removeItem('user');
                this.props.history.push("/");
            }
        } catch{
            this.props.history.push("/");
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('dG9rZW4=');
        }
    }

    getCategories = async () => {
        const { data: category } = await api.get("/category");
        if (!category)
            return;
        this.setState({ categories: category });
    }


    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };


    isEmpty = str => str.toString().trim().length <= 0;

    validateFields = () => {

        if (isNaN(this.state.price)) {
            this.setState({ error: "O preço deve ser um numero" });
            return false;
        }

        if (this.state.price <= 0) {
            this.setState({ error: "O preço não pode ser menor ou igual a zero" });
            return false;
        }

        if (isNaN(this.state.off)) {
            this.setState({ error: "O preço deve ser um numero" });
            return false;
        }

        if (this.state.off <= 0 || this.state >= 100) {
            this.setState({ error: "Valor para desconto invalido" });
            return false;
        }

        if (isNaN(this.state.width)) {
            this.setState({ error: "A largura deve ser um numero" });
            return false;
        }

        if (this.state.width <= 0) {
            this.setState({ error: "A largura não pode ser menor ou igual a zero" });
            return false;
        }

        if (isNaN(this.state.heigth)) {
            this.setState({ error: "A altura deve ser um numero" });
            return false;
        }

        if (this.state.heigth <= 0) {
            this.setState({ error: "A altura não pode ser menor ou igual a zero" });
            return false;
        }

        if (isNaN(this.state.weigth)) {
            this.setState({ error: "O peso deve ser um numero" });
            return false;
        }

        if (this.state.weigth <= 0) {
            this.setState({ error: "O peso não pode ser menor ou igual a zero" });
            return false;
        }

        if (this.isEmpty(this.state.name)) {
            this.setState({ error: "Preencha um nome para o produto" });
            return false;
        }

        if (this.isEmpty(this.state.name)) {
            this.setState({ error: "Preencha uma descrição para o produto" });
            return false;
        }

        if (this.state.category <= 0) {
            this.state({ error: "Selecione uma categoria" });
            return false;
        }

        return true;
    }

    createProduct = async () => {
        let obj = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            price: parseFloat(this.state.price),
            category: this.state.category,
            width: parseFloat(this.state.width),
            height: parseFloat(this.state.heigth),
            weight: parseFloat(this.state.weigth),
            off: parseFloat(this.state.off) / 100
        }
        try {
            let { data: product } = await api.post("/product", obj);
            if (!product) {
                this.setState({ error: "Erro ao adicionar o produto" });
                return false;
            }
            return true;
        } catch (eee) {
            return false;
        }
    }

    finish = async (event) => {
        event.preventDefault();
        //this.mySubmitHandler(event);
        if (this.validateFields())
            if (await this.createProduct()) {
                this.toggleModal();
                this.setState({
                    name: "",
                    category: 0,
                    description: "",
                    error: "",
                    height: 3.5,
                    weight: 15.00,
                    width: 1.0,
                    off: 5
                });
            } else
                this.setState({ error: "Erro ao cadastrar o produto, verifique se o proto já não esta cadastrado" });
    }

    newCategory = async (event) => {
        event.preventDefault();
        try {
            let obj = {
                name: this.state.newCategory
            }
            let { data: category } = await api.post("/category", obj);
            if (!category)
                this.setState({ categoryMessage: "Erro ao cadastrar a nova categoria" });
            this.setState({categoryMessage: "Categoria cadastrada com sucesso"});
            setTimeout(() => window.location.reload(), 1000);
        } catch{
            this.setState({ categoryMessage: "Erro ao cadastrar a nova categoria" });
        }
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
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="width">Desconto (%)*:</Label>
                                            <Input value={this.state.off} onChange={e => this.setState({ off: e.target.value })} type="number" step="any" min="0" max="100" name="widht" id="width" placeholder="Apenas numeros decimais" required />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="width">Largura*:</Label>
                                            <Input value={this.state.width} onChange={e => this.setState({ width: e.target.value })} type="number" step="any" min="0" name="widht" id="width" placeholder="Apenas numeros decimais" required />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="heigth">Altura*:</Label>
                                            <Input value={this.state.heigth} onChange={e => this.setState({ heigth: e.target.value })} type="number" step="any" min="0" name="heigth" id="heigth" placeholder="Apenas numeros decimais" required />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="weigth">Peso*:</Label>
                                            <Input value={this.state.weigth} onChange={e => this.setState({ weigth: e.target.value })} type="number" step="any" min="0" name="weigth" id="weigth" placeholder="Apenas numeros decimais" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <p>*Campos obrigatórios</p>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="categoriaProduto">Categoria*</Label>
                                    <Input type="select" name="categoria" id="categoriaProduto" value={this.state.category} onChange={e => this.setState({ category: e.target.value })}>
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
                                    <Input value={this.state.price} onChange={e => this.setState({ price: e.target.value })} type="number" step="any" name="price" id="price" pattern="^\d+(?:\.\d{1,2})?$" placeholder="Digite o valor do produto" required />
                                </FormGroup>
                                <span className="text-danger">{this.state.error}</span>
                                <FormGroup>
                                    <Button color="primary"
                                        outline type="submit"
                                        value="Enviar" className="myButton" >
                                        Adicionar
                                    </Button>
                                </FormGroup>

                            </Col>
                        </Row>
                    </Form>
                    <Form className="mt-5 App" onSubmit={this.newCategory} >
                        <FormGroup className="bg-warning rounded  p-2">
                            <Label>Cadastrar nova categoria:</Label>
                        </FormGroup>
                        <Row>
                            <Col xs={12}>
                                <Label for="description">Descrição: </Label>
                                <InputGroup>
                                    <Input value={this.state.newCategory} onChange={e => this.setState({newCategory: e.target.value})} type="text" id="description" name="description" />
                                    <Button type="submit">Cadastrar</Button>
                                </InputGroup>
                                <span>{this.state.categoryMessage}</span>
                            </Col>
                        </Row>
                    </Form>
                </Container>


                <Modal isOpen={this.state.isOpen} >
                    <ModalHeader toggle={this.toggleModal}>Pronto!</ModalHeader>
                    <ModalBody>
                        O produto {this.state.name} foi cadastrado com sucesso!
                     </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={this.toggleModal}>OK</Button>
                    </ModalFooter>
                </Modal>



            </>
        );
    }


}
