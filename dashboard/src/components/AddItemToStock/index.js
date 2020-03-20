import React, { Component } from 'react';
import Header from '../Header';

import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Form
} from 'reactstrap';

export default class AddItemToStock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      products: []
    }
  }

  render() {
    return (
      <>
        <Header/>
        <Container className="mt-5 border">
          <Form className="m-2">
            <Row>
              <Col xs={3}>
                <Input type="select" id="stocks" name="stocks" defaultValue="0">
                  <option value="0">Selecione um estoque</option>
                  {this.state.stocks.map(s => (
                    <option value={s.id}>{s.name}</option>
                  ))}
                </Input>
              </Col>
              <Col xs="9">
                <Input type="select" id="products" name="products" defaultValue="0">
                  <option value="0">Selecione um produto</option>
                  {this.state.products.map(p => (
                    <option value={p.id}>{p.name}</option>
                  ))}
                </Input>
              </Col>
            </Row>
          </Form>
        </Container>
      </>
    );
  }
}
