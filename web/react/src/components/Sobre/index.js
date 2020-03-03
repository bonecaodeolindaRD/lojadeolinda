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
                <Media className="mt-4">
                    <Media left top href="#">
                        <Media object src="img/bonecos1.jpg" alt="..." />
                        </Media>
                        <Media body>
                        <Media heading>
                        História
                         </Media>
                         Os Bonecos Gigantes surgem na Europa, provavelmente na Idade Média, sob a influência dos mitos pagãos
                        escondidos
                        pelos temores da Inquisição. Chegam em Pernambuco através da pequena cidade de Belém do São Francisco no
                        sertão do estado.
                   </Media>
                </Media>
                <Media className="mt-4">
                    <Media right href="#">
                        <Media object src="img/boneco3.jpg" alt="bonecos de olinda" />
                    </Media>
                    <Media body>
                        Os bonecos surgiram da vontade de um jovem sonhador que ouvia atento as narrativas de um padre
                        belga
                        sobre o uso de bonecos nas festas
                        religiosas da Europa.
                        O primeiro boneco foi às ruas da pequena cidade durante o carnaval de 1919 com o surgimento do
                        personagem Zé Pereira,
                        confeccionado em corpo de madeira e cabeça em papel machê, somente no ano de 1929 resolveram
                        criar sua
                        companheira, boneca esta batizada com o nome de Vitalina.
                    </Media>
                </Media>

            </Container>
                );
            }
}
