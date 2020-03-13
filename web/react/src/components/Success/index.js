import React, { Component } from 'react';
import Header from '../Header';
import {  Card,CardHeader, CardTitle, CardText, CardBody,  Button,  CardFooter, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class Success extends Component {


    constructor(props){
        super(props);
    }

    
       
          dataApi = async (event) =>{ 
            const data = await axios.get(`http://localhost:8080/ecommerce/productId/${this.props.match.params.id}`)
          }

    

    

     
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
                            {}
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
