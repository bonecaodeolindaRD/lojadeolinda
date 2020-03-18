import React, { Component } from 'react';
import Header from '../Header';
import {  Card,CardHeader, CardTitle, CardText, CardBody,  Button,  CardFooter, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaShoppingBasket} from 'react-icons/fa';


export default class Success extends Component {

    constructor(props){
        super(props);
        this.id = 0;
        this.clearLocal();
    }

    clearLocal = () => {
        let {id} = JSON.parse(sessionStorage.getItem('order'));
        this.id = id;
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('order');
        setTimeout(() => this.props.history.push("/"), 30000);
    }

    render() {

        return (
            <>
                <Header history={this.props.history} location={this.props.location}/>
                <Container  >
                <Card >
                    <CardHeader className="bg-success text-white text-center text"><h5>Compra concluída com sucesso</h5></CardHeader>
                    <CardBody>
                        <CardTitle className="text-center font-weight-bold"><h5>Dados da compra</h5></CardTitle>
                        <CardText className="text-center">
                          Número do pedido: { this.id }
                        </CardText>
                    </CardBody>
                    <CardFooter className=" d-flex justify-content-center">
                        <Link to='/home'>
                            <Button color="warning" > <FaShoppingBasket/> Voltar as compras</Button>
                        </Link>

                    </CardFooter>
                </Card>
               </Container>
               


            </>

        )
    }
}
