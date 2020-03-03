import React, { Component } from 'react';

import {
    Container
} from 'reactstrap';

import Produtos from '../Products';

export default class Home extends Component {

    
    render() {
        
        return (
			<Container>
				<Produtos/>
			</Container>
		);
    }
}
