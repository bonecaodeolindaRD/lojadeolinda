import React, { Component } from 'react';

import {
    Container
} from 'reactstrap';

import Produtos from '../Products';
import Carrossel from '../Carrossel';

export default class Home extends Component {

    
    render() {
        
        return (
			<Container>
                <Carrossel/>
				<Produtos/>
			</Container>
		);
    }
}
