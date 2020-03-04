import React, { Component } from 'react';
import { Card, CardTitle, CardImg, CardImgOverlay, Container, Media } from 'reactstrap';
// import { Container } from './styles';

export default class Sobre extends Component {
    render() {
        return (
            <Container>
                <Card inverse>
                    <CardImg width="100%" src="img/bonecos2ok.jpg" alt="Card image cap" />
                    <CardImgOverlay>
                        <CardTitle>Bonecos de Olinda alegrando o carnaval</CardTitle>
                    </CardImgOverlay>
                </Card>
                <div className="mt-4  p-4" >
                    <h4 className="text-primary text-center" >História</h4>
                    <p className="text-primary">
                        Os Bonecos Gigantes surgem na Europa, provavelmente na Idade Média, sob a influência dos mitos pagãos
                       escondidos
                       pelos temores da Inquisição. Chegam em Pernambuco através da pequena cidade de Belém do São Francisco no
                       sertão do estado.
                    </p>
                    <hr />

                </div>

                <Media className="border border-primary rounded p-4">
                    <Media right top href="#">
                        <Media className="rounded" object src="img/bonecos1.jpg" alt="..." />
                    </Media>
                    <p className="text-primary p-4 mt-5" >
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
                    
                </Media>
                
                <Media className="border border-primary rounded p-4 mt-4">
                    <Media left top href="#">
                        <Media className="rounded" object src="img/boneco3.jpg" alt="..." />
                    </Media>
                    <p className="text-primary p-4 mt-5" >
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
                </Media>
                
               

            </Container>
        );
    }
}
