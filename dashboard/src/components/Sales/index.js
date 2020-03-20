import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

import Header from '../Header';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  Container,
  Col,
  Row,
  FormGroup,
  Label,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

export default class Sales extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      ordersDisplay: [],
      erro: "",
      total: 0
    }
    this.getSales();
    this.getTotal();
  }

  getTotal = () => {
    let sum = 0;
    this.state.ordersDisplay.map(o => 
      sum += o.venda
    );
    this.setState({ total: sum });
  }


  getSales = async () => {
    try {
      let { data } = await axios("http://localhost:8080/ecommerce/sales");
      if (!data)
        return;
      let orders = [];
      data.forEach(o => {
        orders.push({
          name: o[0],
          venda: o[1],
          amt: o[1]
        });
      });
      this.setState({
        orders,
        ordersDisplay: orders
      });
      this.getTotal();
    } catch{
      this.setState({ erro: "" });
    }
  }

  filter = (str) => {
    let ordersDisplay
    if (str === "")
      ordersDisplay = this.state.orders;
    else
      ordersDisplay = this.state.orders.filter(x => x.name === str);
    this.getTotal();
    this.setState({ ordersDisplay });
  }

  render() {
    return (
      <>
        <Header />
        <Container className="text-center mt-5">
          <FormGroup className="bg-warning rounded  p-2">
            <Label>Vendas</Label>
            <br/>
            <Label>Total: {this.state.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Label>
          </FormGroup>
          <Row>
            <Col xs="3">
              <FormGroup className="bg-warning rounded  p-2">
                <Label>Datas</Label>
              </FormGroup>
              <ListGroup>
                <ListGroupItem className="cursor-pointer" onClick={e => this.filter("")}>Todas</ListGroupItem>
                {this.state.orders.map(o => (
                  <ListGroupItem className="cursor-pointer" onClick={e => this.filter(o.name)}>{o.name}</ListGroupItem>
                ))}
              </ListGroup>
            </Col>
            <Col xs="9">
              {this.state.orders.length > 0 ? (
                <>
                  <LineChart
                    width={600}
                    height={300}
                    data={this.state.ordersDisplay}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <Line
                      type='monotone'
                      dataKey='venda'
                      stroke='#8884d8'
                      activeDot={{ r: 8 }}
                    />
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <YAxis />
                    <XAxis dataKey='name' />
                    <Legend />
                  </LineChart>
                  
                </>
              ) :
                (<Container className="text-center">
                  <h2>Nenhuma venda encontrada</h2>
                </Container>
                )}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
