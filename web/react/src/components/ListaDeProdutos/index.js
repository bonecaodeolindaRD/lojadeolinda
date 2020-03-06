import React, { Component} from 'react';
import { FormGroup, Label, Input, Col } from 'reactstrap';


export class PaginaDeProdutos extends Component {
   
    render () {
       
         return (
       <> 
         <Col md={2}>     
            <FormGroup>
        <Label for="exampleSelect">Categorias</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option > Artistas</option>
          <option>Jogadores</option>
          <option>Politicos</option>
          
        </Input>
      </FormGroup>
      </Col>
      </>
                );
              
         }
}

         
