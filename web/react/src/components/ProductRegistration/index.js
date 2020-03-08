import React, { Component } from 'react';
import {
    Nav,
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
    NavLink
} from 'reactstrap';

// import { Container } from './styles';




export default class ProductRegistration extends Component {


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

        alert(name + "" +  description + "" + price);

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
                <NavLink className="navbar navbar-dark bg-dark">
                    <NavLink className="navbar-brand" href="#">Adicione um novo produto</NavLink>
                </NavLink>
                <Container className="border border-primary rounded mt-5 p-4">
                    <Form >
                        <FormGroup className="bg-warning rounded  p-2">
                            <Label>Cadastro de Produdos</Label>
                        </FormGroup>
                        <Row form>
                            <Col md={8}>
                                <FormGroup >
                                    <Label for="name">Nome do Produto*</Label>
                                    <Input type="text" className={`form-control ${this.state.nameError ? 'is-invalid' : null}`} name="name" onChange={this.myChangeHandler} required placeholder="Digite o nome do produto" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Descrição do produto*</Label>
                                    <Input type="textarea" className={`form-control ${this.state.descriptionError ? 'is-invalid' : null}`} name="description" id="description" onChange={this.myChangeHandler} required/>
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
                                    <Label for="imagemProduto">Imagem*</Label>
                                    <Input type="file" name="imagemProduto" id="imagemProduto" />
                                    <FormText color="muted">
                                        Insira a imagem do produto
                                </FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="price">Preço:*</Label>
                                    <Input type="text" name="price" id="price" placeholder="Digite o valor do produto"  className={`form-control ${this.state.priceError ? 'is-invalid' : null}`} onChange={this.myChangeHandler} required/>
                                </FormGroup>
                                <Button color="primary" outline type="submit" value="Enviar"  onClick={this.mySubmitHandler}  >Adicionar</Button>

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
