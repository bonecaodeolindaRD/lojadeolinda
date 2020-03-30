import React, { Fragment } from 'react';
import Header from '../Header';
import { Container, Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <Fragment>
            <Header />
            <Container className="  p-4 rounded"  >

                <Jumbotron>
                    <h1 className="display-3">Ops!</h1>
                    <p className="lead">Não encontramos o que você procurou.</p>
                    <hr className="my-2" />
                    <h4>O que pode ter acontecido?</h4>
                   <p>O conteúdo não está mais no ar.<br/>
                    Você digitou o endereço errado.</p>
                    <p className="lead">
                    <Link to="/"> <Button color="primary">Voltar para página inicial</Button></Link>
                    </p>
                </Jumbotron>

            </Container>
        </Fragment>
    );
}

export default NotFound;