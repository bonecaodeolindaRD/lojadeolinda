import React, { Component } from 'react';
import Header from '../Header';
import {  Card,CardHeader, CardTitle, CardText, CardBody,  Button,  CardFooter, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Success extends Component {

    render() {

        return (
            <>
                <Header />
                <Container  >
                <Card >
                    <CardHeader className="bg-success text-white text-center text">Compra concluida com sucesso</CardHeader>
                    <CardBody>
                        <CardTitle className="text-center font-weight-bold">Dados da compra</CardTitle>
                        <CardText>
                            Numero do pedido : "1234567"
                        </CardText>
                    </CardBody>
                    <CardFooter className=" d-flex justify-content-center">
                        <Link to='/home'>
                            <Button > Voltar as compras</Button>
                        </Link>

                    </CardFooter>
                </Card>
               </Container>
               


            </>

        )
    }
}
