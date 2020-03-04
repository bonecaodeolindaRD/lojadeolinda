import React, { Component } from 'react';
import { Container, Row, Col, Table, ListGroup, ListGroupItem,  Button, Form, Label, Input, FormGroup } from 'reactstrap';
import { FaShoppingCart, FaCheckCircle } from 'react-icons/fa';


export default class DetalharProduto extends Component {

    constructor(){
        super();
        this.state = {
        
            id: 1,
            img: "https://odia.ig.com.br/_midias/jpg/2019/03/05/700x470/1_d021stjx0airpfp-10035734.jpg",
            nome: "Bonecão Galvão Bueno",
            descricao: "Carlos Eduardo dos Santos Galvão Bueno, mais conhecido como Galvão Bueno (Rio de Janeiro, 21 de julho de 1950), é um empresário, narrador, radialista e apresentador esportivo brasileiro.É considerado o narrador esportivo mais famoso do Brasil." ,
            quantidade: 1,                
            precoUnitario: 999.99                    
        }
     }
      
  render() {
    return (

        <Container className="pt-5 pb-2">

        <Row className="row">

            <Col className="mb-3" xs="12" sm="4" md="4" lg="4">
                    <img src={this.state.img} className="rounded" width="100%"
                        title="Imagem Produto" alt="Imagem do produto" />
            </Col>

            <Col xs="12"  sm="6" md="6" lg="6">

                <h3>{this.state.nome}</h3>
                <hr className="soft" />
                <Form className="form-horizontal qtyFrm">
                    <FormGroup className="control-group">
                        <Label for="qtd"  className="control-label pb-2 pr-5"><h5>R${this.state.precoUnitario}</h5></Label >
                         <Input type="number" min="1" placeholder="Digite a quantidade" id="qtd" value={this.state.quantidade} className="col-6 mb-2"  />
                                <Button outline color="warning"> <FaShoppingCart/> Comprar</Button>
                    </FormGroup>
                </Form>

                <Form className="form-horizontal qtyFrm">
                    <hr className="soft" />
                    <FormGroup className="control-group">
                        <Label for="cepFrete"  className="control-label pt-3"><h6>Calcular Frete e Prazo</h6></Label>
                            <Input id="cepFrete" type="text" className="col-6 mb-2" placeholder="Digite o CEP" />
                            <Button outline color="warning"> <FaCheckCircle/> OK</Button>
                        <hr className="soft" />
                    </FormGroup>
                </Form>
            
                <ListGroup id="productDetail" className="nav nav-tabs pt-3">
                    <ListGroupItem><h6 data-toggle="tab">Descrição do Produto</h6></ListGroupItem>
                </ListGroup>

                <Table>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            {this.state.descricao}
                            </td>
                        </tr>
                    </tbody>
                </Table >
            </Col>
        </Row>    

        </Container> 
    );
  }
}
