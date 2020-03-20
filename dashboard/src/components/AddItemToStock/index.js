import React, { Component } from 'react';
import axios from 'axios';

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
      message: " "
    }
    this.getStocks();
    this.getItemsNotRegistered();
  }


  getStocks = async () => {
    const { data: stocks} = await axios("http://localhost:8080/ecommerce/stock/all");
    if(!stocks)
      return;
    this.setState({stocks});
  }

  getItemsNotRegistered = async () => {
    const { data: products} = await axios("http://localhost:8080/ecommerce/stock/notregistered");
    this.setState({products});
  }

  render() {
    return (
      <>
        <Header />
        <Container className="mt-5 border">
          <Form className="m-2">
            <Row>
              <Col xs={3}>
                <FormGroup>
                  <Label for="stocks">Estoques: </Label>
                  <Input type="select" id="stocks" name="stocks" defaultValue="0">
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
                  <Input type="select" id="products" name="products" defaultValue="0">
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
                  <Input type="number" id="quantity" name="quanatity" min={0} />
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
