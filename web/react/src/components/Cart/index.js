import React, { Component } from 'react';
import { Col, Row, Container, Input, Button} from 'reactstrap';
import { FaTimesCircle } from 'react-icons/fa';
import './index.css';
import Header from '../Header';
import Footer from '../Footer';

export default class Cart extends Component {
 
    constructor(){
      super();
      this.state = {
          products: [
          
              {
                  id: 1,
                  image: "https://f.i.uol.com.br/fotografia/2019/03/05/15517673725c7e174c842b1_1551767372_3x2_lg.jpg",
                  name: "Bonecão do Teste",
                  quantity: 2,
                  price: 2000.99
              },

              {
                id: 2,
                image: "https://f.i.uol.com.br/fotografia/2019/03/05/15517673725c7e174c842b1_1551767372_3x2_lg.jpg",
                name: "Bonecão do Bolsonaro",
                quantity: 2,
                price: 2000.99
            }
          ],
          total: 0
      }
  }


  render() {
    return (

     <>

     <Header/>

        
      <Container className="contanier">

       {this.state.products.map(item => (
           
        <Row className="row cart-row mt-5 mb-5" id="cart-row-prod" key={item.id}>

            <Col xs="12" sm="2">
                <div className="float-left">
                    <p id="removeItem" title="Remover item do carrinho!">
                      <FaTimesCircle/> 
                    </p>
                </div>
                   <img src={item.image} alt={item.name} title={item.name}
                        className="img-responsive mb-3" width="100%"/>
            </Col>

            <Col className="mb-3" xs="12" sm="4" id="p">
                <h5>{item.name}</h5>
                <small>Nome do Produto</small>
            </Col>

            <Col className="mb-3" xs="5" sm="2">
                <h5 className="h3-price">
                  R${item.price}
                </h5>
                <small>Preço Unitário</small>
            </Col>

            <Col className="mb-3" xs="7" sm="2">
                <div className="form-group">
                    <Input type="number" name="quantidade" id="quantidade" min="1"  className="cart-qty-input"/>
                    <small>Quantidade</small>
                </div>
            </Col>

            <Col className="mb-3" xs="12" sm="2">
                <h5 className="h3-price">
                    R${item.quantity * item.price}
                </h5>
                <small>Total Item</small>
            </Col>
    
        </Row>

       ))}

        <div className="d-flex justify-content-end mt-5 mb-5">

        <p>Total R${this.state.total}</p>

        </div>

        <div className="d-flex justify-content-end mt-5 mb-5">

        <Button>Finalizar Compra</Button>

        </div>

      
      </Container>

    <Footer/>

    </>

    );
  }
}
