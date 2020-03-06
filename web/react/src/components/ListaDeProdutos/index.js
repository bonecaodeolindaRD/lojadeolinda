import React, { Component} from 'react';
import {FormGroup, Label, Input, Col } from 'reactstrap';
//FormGroup, Label, Input, Col,

export class PaginaDeProdutos extends Component {
   //let classificacao = cadastro =>{
     
   //}: 
  
  buscarClassificacao(){
        
    } 


   // const meteoro = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=1g4VNGCls0bLaxg73q6n9jJ2lhjNxSO8hxYtSq6X`)



    render () {
       
         return (
       <> 
        <Col md={2}>     
            <FormGroup>
        <Label for="exampleSelect">Categorias</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option href="#" >Artistas</option>
          <option href="#">Jogadores</option>
          <option href="#">Politicos</option>
          
        </Input>
      </FormGroup>
      </Col> 
      </>
                );
              
         }
}

         
