import React, { Component } from 'react';
import { Card, CardTitle, CardText, Container, Col, CardImg, Row } from 'reactstrap';
import {
    FaShoppingCart
} from "react-icons/fa";
import './style.css'
import Footer from '../Footer/index';
export  class Produto extends Component {

    state = {
        carregando: false,
        meteoro: []
    } 

    buscarArtistas = async (evento) => {
        evento.preventDefault() 

        this.setState({ carregando: true })

       
        const input = evento.target
        const col= col.children[0]
        const car = col.children[0]
        
     //   const meteoro = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=1g4VNGCls0bLaxg73q6n9jJ2lhjNxSO8hxYtSq6X`)
       // const meteoro = await axios(``)
   }




    render() {

        return (
            <>
              
                 

                <Col md={11}className="bordasLista mb-2" > <a href="
">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://pbs.twimg.com/media/Df6jyGTWkAAf3NK.jpg" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Neymar Junior</h3></CardTitle>
                                    <CardText> Mais detalhes...
                                        </CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container> 
                     </a>
                </Col>  

                <Col md={11}className="bordasLista mb-2" ><a href="">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://2.bp.blogspot.com/-0BJARl5Js1s/UD6wonsRqYI/AAAAAAAAE3U/jPYSdahnDSE/s1600/100_9690.JPG" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>William Bonner</h3></CardTitle>
                                    <CardText>Mais detalhes ...</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container>
                    </a>
                </Col>

                <Col md={11}className="bordasLista mb-2" > <a href="">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://conteudo.imguol.com.br/c/entretenimento/60/2017/02/22/zeze-di-camargo-conhece-de-perto-bonecos-de-olinda-em-homenagem-a-dupla-1487790270533_v2_960x1280.jpg" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Jorge e Matheus</h3></CardTitle>
                                    <CardText>Mais detalhes ...</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container> </a>
                </Col>


                <Col md={11}className="bordasLista mb-2" > <a href="
">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://p2.trrsf.com/image/fget/cf/1200/1200/filters:quality(85)/images.terra.com/2019/03/04/201903041337119812.jpg" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Bolsonaro</h3></CardTitle>
                                    <CardText>Mais detalhes ...</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container> </a>
                </Col>


                <Col md={11}className="bordasLista mb-2" ><a href="#">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://lh3.googleusercontent.com/proxy/x9oNlItfwSdIZ5T_2VFtyXHAyByT_OCEzVxvKnTvLdfwFkhjjVejU8c7arrd4cNwJVgxigU4n8vmXAC9HMgPP_DWaA80GRmOHlysuMTLKPnitqHdmF94o7LGUOs" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Falcão</h3></CardTitle>
                                    <CardText>Mais detalhes ...</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container> </a>
                </Col>


                <Col md={11}className="bordasLista mb-2" > <a href="#">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://4.bp.blogspot.com/-CSVqn47Kctg/WLXG9CNB78I/AAAAAAAD6Dg/2lETPKvt4pgt4dNfYg5pf5t7F6wI_slwgCLcB/s1600/20170228_152306-1.jpg" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Palhaços</h3></CardTitle>
                                    <CardText>Mais detalhes</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container> </a>
                </Col>


                <Col md={11}className="bordasLista mb-2" > <a href="#">
                    <Container className="themed-container " fluid={true}  >
                        <Row >
                            <Col md={3} >

                                <CardImg className="p-3" width="100%" src="https://img.r7.com/images/bonecos-olinda-04032019105024040" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Hulk </h3></CardTitle>
                                    <CardText>Mais detalhes ...</CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="precoProduto ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="itensProduto">
                                <button className="carrinho p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>

                        </Row>
                    </Container> </a>
                </Col>
              <Footer></Footer>
            </>
        );
    }
}