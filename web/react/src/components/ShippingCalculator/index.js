import React, { Component } from 'react';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';
import { FaCheckCircle } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import axios from 'axios';

export default class ShippingCalculator extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
        code: '',
        message: '',
        dataApi: [] };
      }
     
      mySubmitHandler = async (event) => {

        event.preventDefault();
        let code = this.state.code;

        code = code.replace('_','').replace('-','');

        if(code.length < 8){
          this.setState({ message: 'Um CEP deve conter 8 digítos' });
          return;
        }
           
        const findAddress = await axios( `http://viacep.com.br/ws/${code}/json`);

        this.setState({dataApi: [findAddress.data]})

        if(!this.state.dataApi[0].erro){

          this.setState({ message: 'Receba em até 10 dias úteis R$200.00' });

        }else{

          this.setState({ message: 'O CEP informado não foi localizado' });

        }
       
        
      }

      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});     
      
      }
      
      render() {
        return (

          <Form className="form-horizontal qtyFrm">
                    <hr className="soft" />
                    <FormGroup className="control-group">
                        <Label for="cepFrete"  className="control-label pt-3"><h6>Simular Frete e Prazo</h6></Label>
                            <Input name="code" type="text" className="col-6 mb-2" placeholder="Digite o CEP" onChange={this.myChangeHandler} mask="99999-999"  tag={InputMask}/>
                            <p id="freteCalculado">{this.state.message}</p>
                            <Button outline color="warning" onClick={this.mySubmitHandler} >  <FaCheckCircle/> OK</Button>
                        <hr className="soft" />
                    </FormGroup>
                </Form>
          
        );
      }
}
