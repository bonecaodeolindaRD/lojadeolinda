import React, { Component } from 'react';
import { Card, CardTitle, CardText, Container, Col, CardImg, Row, FormGroup, Label, Input } from 'reactstrap';
import {
    FaShoppingCart, FaSearch
} from "react-icons/fa";
import './style.css'
import Footer from '../Footer/index';

export class Product extends Component {

    // constructor() {
    //     this.state = {
    //         productsList =[
    //             {
    //                 category: 1,
    //                 id: 1,
    //                 name: "Produto",
    //                 img: "https://picsum.photos/50/50",
    //                 price: 999.99,
    //                 quantity: 1,
    //             },
    //             {
    //                 category: 2,
    //                 id: 2,
    //                 name: "Produto",
    //                 img: "https://picsum.photos/50/50",
    //                 price: 999.99,
    //                 quantity: 2
    //             },
    //             {
    //                 category: 3,
    //                 id: 3,
    //                 name: "Produto",
    //                 img: "https://picsum.photos/50/50",
    //                 price: 999.99,
    //                 quantity: 3
    //             }
    //             ,
    //             {
    //                 category: 1,
    //                 id: 4,
    //                 name: "Produto",
    //                 img: "https://picsum.photos/50/50",
    //                 price: 999.99,
    //                 quantity: 2
    //             }
    //             ,
    //             {
    //                 category: 3,
    //                 id: 5,
    //                 name: "Produto Olinda",
    //                 img: "https://picsum.photos/50/50",
    //                 price: 999.99,
    //                 quantity: 2
    //             }
    //         ]
    //     }
    //     this.searchFilter("olinda");
    // }

    
    

    // searchFilter(nameProduct) {
    //     let products = this.state.productsList.filter(x => x.name.toUpperCase().includes(nameProduct.toUpperCase()));
    //     console.log(products);

    constructor() {
        super();
        this.state = {
            products: [
                {
                    category: 1,
                    id: 1,
                    name: "Produto",
                    img: "https://picsum.photos/50/50",
                    price: 999.99,
                    quantity: 1,
                },
                {
                    category: 2,
                    id: 2,
                    name: "Produto",
                    img: "https://picsum.photos/50/50",
                    price: 999.99,
                    quantity: 2
                },
                {
                    category: 3,
                    id: 3,
                    name: "Produto",
                    img: "https://picsum.photos/50/50",
                    price: 999.99,
                    quantity: 3
                }
                ,
                {
                    category: 1,
                    id: 4,
                    name: "Produto",
                    img: "https://picsum.photos/50/50",
                    price: 999.99,
                    quantity: 2
                }
                ,
                {
                    category: 3,
                    id: 5,
                    name: "Produto Olinda",
                    img: "https://picsum.photos/50/50",
                    price: 999.99,
                    quantity: 2
                }
            ]
           // itemsFilter : []

        }
        
        this.searchItem("olinda");
    }

    searchItem = (str) => {
        let itemsFilter = []
        let itemsName = this.state.products.filter(x => x.category.toUpperCase().includes(str.toUpperCase())
        )
        let itemsImg = this.state.products.filter(x => x.img.toUpperCase().includes(str.toUpperCase())
        )
        let itemsPrice = this.state.products.filter(x => x.price)
                
        this.state.itemsFiltersa.push(itemsName,itemsImg,itemsPrice);
        
        console.log(itemsFilter);
        console.log(itemsName, itemsFilter);


        return 
        
    }

        <li>

            <Row >
                {this.state.productsList.map(item => (
                    <Col md={11} className="bordList mb-2" id="play" >
                        <Container className="themed-container " fluid={true}  >
                            <Col md={3} id="Player">

                                <CardImg className="p-3" width="100%" src="https://pbs.twimg.com/media/Df6jyGTWkAAf3NK.jpg" alt="Card image cap" />
                            </Col>

                            <Col md={4} >
                                <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                    <CardTitle ><h3>Neymar Junior</h3></CardTitle>
                                    <CardText> Mais detalhes...
                </CardText>

                                </Card>
                            </Col>

                            <Col md={2} className="productPrice ">
                                <span className="p-4"> 999,99</span>
                            </Col>

                            <Col md={2} className="productItem">
                                <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                    <FaShoppingCart size="40px" ></FaShoppingCart>
                                </button>
                            </Col>
                           
                        </Container>
                    </Col>
                     ))}
                    </Row>        

        </li>
    




    // search(){
    // }
            

    render() {

        return (
            <>

                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="Select">Categorias</Label>
                            <Input type="select" name="select" id="selection">
                                <option onClick="search()" name="Artist"> Artistas</option>
                                <option onClick="search()" name="Player">Jogadores</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <ul>
                    <li>
                        <Col md={11} className="bordList mb-2" id="play" >
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} id="Player">

                                        <CardImg className="p-3" width="100%" src="https://pbs.twimg.com/media/Df6jyGTWkAAf3NK.jpg" alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted tirarBorda descricaoProduto p-4 " >

                                            <CardTitle ><h3>Neymar Junior</h3></CardTitle>
                                            <CardText> Mais detalhes...
                                        </CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4"> 999,99</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>

                        </Col>
                    </li>

                    <li>

                        <Col md={11} className="bordList mb-2" id="art">
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src="https://2.bp.blogspot.com/-0BJARl5Js1s/UD6wonsRqYI/AAAAAAAAE3U/jPYSdahnDSE/s1600/100_9690.JPG" alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removerBord productDescription p-4 " >

                                            <CardTitle ><h3>William Bonner</h3></CardTitle>
                                            <CardText>Mais detalhes ...</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4"> 999,99</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>

                        </Col>
                    </li>

                    <li>
                        <Col md={11} className="bordList mb-2" id="art" >
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src="https://conteudo.imguol.com.br/c/entretenimento/60/2017/02/22/zeze-di-camargo-conhece-de-perto-bonecos-de-olinda-em-homenagem-a-dupla-1487790270533_v2_960x1280.jpg" alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removerBord productDescription p-4 " >

                                            <CardTitle ><h3>Jorge e Matheus</h3></CardTitle>
                                            <CardText>Mais detalhes ...</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4"> 999,99</span>
                                    </Col>

                                    <Col md={2} className="productItemo">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>

                    </li>

                    <li>
                        <Col md={11} className="bordList mb-2" id="art">
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src="https://p2.trrsf.com/image/fget/cf/1200/1200/filters:quality(85)/images.terra.com/2019/03/04/201903041337119812.jpg" alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removeBord productDescription p-4 " >

                                            <CardTitle ><h3>Bolsonaro</h3></CardTitle>
                                            <CardText>Mais detalhes ...</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4"> 999,99</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>

                    </li>

                    <li>
                        <Col md={11} className="bordList mb-2" id="art" >
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src="https://lh3.googleusercontent.com/proxy/x9oNlItfwSdIZ5T_2VFtyXHAyByT_OCEzVxvKnTvLdfwFkhjjVejU8c7arrd4cNwJVgxigU4n8vmXAC9HMgPP_DWaA80GRmOHlysuMTLKPnitqHdmF94o7LGUOs" alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removeBord productDescription p-4 " >

                                            <CardTitle ><h3>Falcão</h3></CardTitle>
                                            <CardText>Mais detalhes ...</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice">
                                        <span className="p-4"> 999,99</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>
                    </li>

                    <li>

                        <Col md={11} className="bordList mb-2" >
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src="https://4.bp.blogspot.com/-CSVqn47Kctg/WLXG9CNB78I/AAAAAAAD6Dg/2lETPKvt4pgt4dNfYg5pf5t7F6wI_slwgCLcB/s1600/20170228_152306-1.jpg" alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removeBord productDescription p-4 " >

                                            <CardTitle ><h3>Palhaços</h3></CardTitle>
                                            <CardText>Mais detalhes</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4"> 999,99</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>
                    </li>

                    <li>
                        <Col md={11} className="bordList mb-2" >
                            <Container className="themed-container " fluid={true}  >
                                <Row >
                                    <Col md={3} >

                                        <CardImg className="p-3" width="100%" src="https://img.r7.com/images/bonecos-olinda-04032019105024040" alt="Card image cap" />
                                    </Col>

                                    <Col md={4} >
                                        <Card body inverse className="text-muted removeBord productDescription p-4 " >

                                            <CardTitle ><h3>Hulk </h3></CardTitle>
                                            <CardText>Mais detalhes ...</CardText>

                                        </Card>
                                    </Col>

                                    <Col md={2} className="productPrice ">
                                        <span className="p-4"> 999,99</span>
                                    </Col>

                                    <Col md={2} className="productItem">
                                        <button className="cart p-4" alt="adicionar ao carrinho" title="Adicionar ao carrinho">
                                            <FaShoppingCart size="40px" ></FaShoppingCart>
                                        </button>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>
                    </li>
                </ul>
                <Footer></Footer>
            </>
        );
    }
}


