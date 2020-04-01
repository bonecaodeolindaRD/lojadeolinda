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
  ModalFooter
} from 'reactstrap';


export default class EditProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      id: null,
      category: 0,
      name: '',
      description: '',
      price: 2000.2,
      width: 1.0,
      height: 3.5,
      weight: 15,
      off: 5,
      image: '',
      error: ''
    };

  }

  componentDidMount(){
    if(!sessionStorage.getItem('user')){
      this.props.history.push("/");
      return;
    }
    this.existentUser();
    this.getCategories();
    this.loadProduct();
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

  loadProduct = async () => {
    try {
      const { data: product } = await api.get("/product/" + this.props.match.params.id);
      console.log(product);
      if (!product) {
        this.setState({ errr: "Erro ao carregar o produto" });
        return;
      }
      this.setState({
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        category: product.category,
        width: product.width,
        height: product.height,
        weight: product.weight,
        off: product.off * 100
      });
      console.log(this.state);
    } catch{
      this.setState({ errr: "Erro ao carregar o produto" });
    }
  }

  getCategories = async () => {
    try {
      const { data: category } = await api.get("/category");
      if (!category) {
        this.setState({ errr: "Erro ao carregar as categorias" });
        return;
      }
      this.setState({ categories: category });
    } catch{
      this.setState({ errr: "Erro ao carregar as categorias" });
    }
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

    if (isNaN(this.state.height)) {
      this.setState({ error: "A altura deve ser um numero" });
      return false;
    }

    if (this.state.height <= 0) {
      this.setState({ error: "A altura não pode ser menor ou igual a zero" });
      return false;
    }

    if (isNaN(this.state.weight)) {
      this.setState({ error: "O peso deve ser um numero" });
      return false;
    }

    if (this.state.weight <= 0) {
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

  editProduct = async () => {
    try {
      let obj = {
        name: this.state.name,
        description: this.state.description,
        image: this.state.image,
        price: parseFloat(this.state.price),
        category: this.state.category,
        width: parseFloat(this.state.width),
        height: parseFloat(this.state.height),
        weight: parseFloat(this.state.weight),
        off: parseFloat(this.state.off) / 100
    }
      const { data: product } = await api.post("/product/" + this.state.id, obj);
      if (!product) {
        this.setState({ errr: "Erro ao editar o produto" });
        return false;
      }
      return true;
    } catch{
      this.setState({ errr: "Erro ao editar o produto" });
      return false;
    }
  }

  finish = async evt => {
    evt.preventDefault();
    if(this.validateFields())
      if(await this.editProduct())
        this.toggleModal();
      else
        this.setState({error: "erro ao editar o produto"});
  }

  render() {
    return (
      <>
        <Header />}
        <Container className="border border-primary rounded mt-5 p-4">
          {this.state.id ? (
          <Form className="App" onSubmit={this.finish}>
            <FormGroup className="bg-warning rounded  p-2">
              <Label>Editar produto</Label>
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
                      <Input value={this.state.height} onChange={e => this.setState({ height: e.target.value })} type="number" step="any" min="0" name="heigth" id="heigth" placeholder="Apenas numeros decimais" required />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="weigth">Peso*:</Label>
                      <Input value={this.state.weight} onChange={e => this.setState({ weight: e.target.value })} type="number" step="any" min="0" name="weigth" id="weigth" placeholder="Apenas numeros decimais" required />
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
                    Editar
                                    </Button>
                </FormGroup>

              </Col>
            </Row>
          </Form>
          ) : (
            <h2>Produto não encontrado, não é possivel edita-lo</h2>
          )}
        </Container>

        <Modal isOpen={this.state.isOpen} >
          <ModalHeader toggle={this.toggleModal}>Pronto!</ModalHeader>
          <ModalBody>
            O produto {this.state.name} foi editado com sucesso!
                     </ModalBody>
          <ModalFooter>
            <Button outline color="secondary" onClick={this.toggleModal}>OK</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
