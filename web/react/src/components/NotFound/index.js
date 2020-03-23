import React, { Fragment } from 'react';
import Header from '../Header';
import {Container} from 'reactstrap';

const NotFound = () =>{

    return (
        <Fragment>
            <Header />
            <Container className="text-center">
                <span className="h2">Página não encontrada</span>
            </Container>
        </Fragment> 
    );
}

export default NotFound;