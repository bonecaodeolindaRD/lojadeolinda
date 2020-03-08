import React, { Component } from 'react';
import { Col, Row, Container, Input} from 'reactstrap';
import { FaTimesCircle } from 'react-icons/fa';
import './index.css';
import Header from '../Header';
import Footer from '../Footer';

export default class Cart extends Component {
 
    constructor(){
      super();
      this.state = {
          produtos: [
          
              {
                  id: 2,
                  img: "https://f.i.uol.com.br/fotografia/2019/03/05/15517673725c7e174c842b1_1551767372_3x2_lg.jpg",
                  nome: "Bonecão do Bolsonaro",
                  quantidade: 2,
                  precoUnitario: 2000.99
              },

              {
                id: 2,
                img: "https://f.i.uol.com.br/fotografia/2019/03/05/15517673725c7e174c842b1_1551767372_3x2_lg.jpg",
                nome: "Bonecão do Bolsonaro",
                quantidade: 2,
                precoUnitario: 2000.99
            }
          ]
      }
  }

  render() {
    return (

     <>

     <Header/>

        
      <Container className="contanier">

       {this.state.produtos.map(produto => (
           
        <Row className="row cart-row mt-5" id="cart-row-prod">

            <Col xs="12" sm="2">
                <div className="float-left">
                    <a id="removeItem" title="Remover item do carrinho!">
                      <FaTimesCircle/> 
                    </a>
                </div>
                   <img src={produto.img} alt={produto.nome} title={produto.nome}
                        className="img-responsive mb-3" width="100%"/>
            </Col>

            <Col className="mb-3" xs="12" sm="4" id="p">
                <h5>{produto.nome}</h5>
                <small>Nome do Produto</small>
            </Col>

            <Col className="mb-3" xs="5" sm="2">
                <h5 className="h3-price">
                  R${produto.precoUnitario}
                </h5>
                <small>Preço Unitário</small>
            </Col>

            <Col className="mb-3" xs="7" sm="2">
                <div className="form-group">
                    <Input type="number" name="quantidade" id="quantidade" min="1" value={produto.quantidade} className="cart-qty-input"/>
                    <small>Quantidade</small>
                </div>
            </Col>

            <Col className="mb-3" xs="12" sm="2">
                <h5 className="h3-price">
                    R${produto.quantidade * produto.precoUnitario}
                </h5>
                <small>Total Item</small>
            </Col>
    
        </Row>

       ))}
      
      </Container>

    <Footer/>

    </>

    );
  }
}
