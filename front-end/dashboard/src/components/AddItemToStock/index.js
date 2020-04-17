import React, { Component } from 'react';
import api from '../../services/api';

import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Label,
  Form,
  FormGroup
} from 'reactstrap';

import Header from '../Header';

export default class AddItemToStock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      products: [],
      message: " ",
      stock: 0,
      product: 0,
      quantity: 0
    }
  }

  componentDidMount() {
    if (!sessionStorage.getItem('user')) {
      this.props.history.push("/");
      return;
    }
    this.existentUser();
    this.getStocks();
    this.getItemsNotRegistered();
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

  getStocks = async () => {
    const { data: stocks } = await api.get("/stock/all");
    if (!stocks)
      return;
    this.setState({ stocks });
  }

  getItemsNotRegistered = async () => {
    const { data: products } = await api.get("/product");
    this.setState({ products });
  }

  registerProduct = async () => {

    let obj = {
      id: this.state.product
    }
    try {
      const { data: product } = await api.post("/stock/product/new/" + this.state.stock, obj);
      if (!product)
        return false;

      return true;
    } catch (eee) {
      return false;
    }
  }

  addItem = async () => {

    try {
      const { data: product } = await api.post(`stock/product/edit/${this.state.stock}/${this.state.product}/${this.state.quantity}`);
      if (!product) {
        this.setState({ message: "Erro ao adicionar unidades do produto" });
        return false;
      }
      return true;
    } catch (eee) {
      this.setState({ message: "Erro ao adicionar unidades do produto" });
      return false;
    }

  }

  finish = async evt => {
    evt.preventDefault();
    if (await this.registerProduct())
      this.setState({ message: "Item cadastrado com sucesso" });
    if (await this.addItem())
      this.setState({
        stock: 0,
        product: 0,
        quantity: 0,
        message: "Item adicionado ao estoque com sucesso"
      });

  }

  render() {
    return (
      <>
        <Header />
        <Container className="mt-5 border">
          <Form className="m-2" onSubmit={this.finish}>
            <Row>
              <Col xs={3}>
                <FormGroup>
                  <Label for="stocks">Estoques: </Label>
                  <Input type="select" id="stocks" name="stocks" value={this.state.stock} onChange={e => this.setState({ stock: e.target.value })}>
                    <option value="0">Selecione um estoque</option>
                    {this.state.stocks.map(s => (
                      <option value={s.id}>{s.name}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs={3}>
                <FormGroup>
                  <Label for="products">Produtos: </Label>
                  <Input type="select" id="products" name="products" value={this.state.product} onChange={e => this.setState({ product: e.target.value })}>
                    <option value="0">Selecione um produto</option>
                    {this.state.products.map(p => (
                      <option value={p.id}>{p.name}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs={3}>
                <FormGroup>
                  <Label for="quantity">Quantidade a adicionar: </Label>
                  <Input type="number" id="quantity" name="quanatity" min={0} value={this.state.quantity} onChange={e => this.setState({ quantity: e.target.value })} />
                </FormGroup>
              </Col>
              <Col xs={3}>
                <Label>Finalizar</Label>
                <Button color="success" type="submit" className="form-control">Adicionar</Button>
                <span>{this.state.message}</span>
              </Col>
            </Row>
          </Form>
        </Container>
      </>
    );
  }
}
