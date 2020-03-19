import React, { Component } from 'react';
import {
    Card,
    CardTitle,
    CardImg,
    CardImgOverlay,
    Container,
    Media,
    Col,
    Row
} from 'reactstrap';

import { Link } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

export default class About extends Component {
    render() {
        return (
            <>
                <Header history={this.props.history} location={this.props.location}/>
                <Container>

                    <Card inverse>
                        <CardImg width="100%" src="img/bonecos2ok.jpg" alt="Card image cap" />
                        <CardImgOverlay>
                            <CardTitle>Bonecos de Olinda alegrando o carnaval</CardTitle>
                        </CardImgOverlay>
                    </Card>

                    <Col md={12} >
                        <h4 className="text-center" >História</h4>
                        <p>
                            Os Bonecos Gigantes surgem na Europa, provavelmente na Idade Média, sob a influência dos mitos pagãos
                           escondidos
                           pelos temores da Inquisição. Chegam em Pernambuco através da pequena cidade de Belém do São Francisco no
                           sertão do estado.
                    </p>
                        <hr />

                    </Col>
                    <Row>
                        <Col xs={10} md={4} >
                            <Link to="/about">
                                <Media right top fluid="true">
                                    <Media className="rounded" object src="img/bonecos1.jpg" alt="..." />
                                </Media>
                            </Link>
                        </Col>
                        <Col xs={10} md={8}>

                            <p className="p-4 mt-5" >
                                Os bonecos surgiram da vontade de um jovem sonhador que ouvia atento as narrativas de um padre
                               belga
                               sobre o uso de bonecos nas festas
                                religiosas da Europa.
                               O primeiro boneco foi às ruas da pequena cidade durante o carnaval de 1919 com o surgimento do
                               personagem Zé Pereira,
                               confeccionado em corpo de madeira e cabeça em papel machê, somente no ano de 1929 resolveram
                               criar sua
                               companheira, boneca esta batizada com o nome de Vitalina.
                        </p>
                        </Col>

                    </Row>
                    <hr />
                    <Row>
                        <Col xs={10} md={4}>
                            <Link to="/about">
                                <Media left top fluid="true">
                                    <Media className="rounded" object src="img/boneco3.jpg" alt="..." />
                                </Media>
                            </Link>
                        </Col>
                        <Col xs={10} md={8}>
                            <p className="p-4 mt-5" >
                                A tradição dos bonecos gigantes, iniciada em Belém do São Francisco, ganhou as ladeiras de Olinda em
                                1932, com a criação do
                                boneco do Homem da Meia Noite, confeccionado pelas mãos dos artistas plásticos Anacleto e Bernardino
                                da
                                Silva, em 1937 surgiu
                                a Mulher do Meio Dia, em 1974 foi à vez do Menino da Tarde pelas mãos do artista plástico Silvio
                                Botelho
                                Botelho, que popularizou
                                a tradição com criação do Encontro dos Bonecos Gigantes, onde vários bonecos de diversos artistas se
                                encontram para um grande desfile
                                pelo sitio histórico de Olinda na terça de carnaval.
                        </p>

                        </Col>
                    </Row>
                    <hr />
                </Container>
                <Footer />
            </>
        );
    }
}