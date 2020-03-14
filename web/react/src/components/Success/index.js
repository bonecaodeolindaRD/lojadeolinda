import React, { Component } from 'react';
import Header from '../Header';
import {  Card,CardHeader, CardTitle, CardText, CardBody,  Button,  CardFooter, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaShoppingBasket} from 'react-icons/fa';


export default class Success extends Component {

    render() {

        return (
            <>
                <Header />
                <Container  >
                <Card >
                    <CardHeader className="bg-success text-white text-center text"><h5>Compra concluída com sucesso</h5></CardHeader>
                    <CardBody>
                        <CardTitle className="text-center font-weight-bold"><h5>Dados da compra</h5></CardTitle>
                        <CardText>
                        <h6>Número do pedido: 1234567</h6>
                        </CardText>
                    </CardBody>
                    <CardFooter className=" d-flex justify-content-center">
                        <Link to='/home'>
                            <Button outline color="warning" > <FaShoppingBasket/> Voltar as compras</Button>
                        </Link>

                    </CardFooter>
                </Card>
               </Container>
               


            </>

        )
    }
}
