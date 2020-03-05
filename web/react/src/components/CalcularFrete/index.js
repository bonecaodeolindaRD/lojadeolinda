import React, { Component } from 'react';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';
import { FaCheckCircle } from 'react-icons/fa';

// import { Container } from './styles';

export default class CalcularFrete extends Component {
    
    constructor(props) {
        super(props);
        this.state = { frete: 'Receba em até 10 dias úteis R$200,00' };
      }
      
      change(event) {
        this.setState({ frete: event.target.value });
      }
      
      render() {
        return (

          <Form className="form-horizontal qtyFrm">
                    <hr className="soft" />
                    <FormGroup className="control-group">
                        <Label for="cepFrete"  className="control-label pt-3"><h6>Calcular Frete e Prazo</h6></Label>
                            <Input id="cepFrete" type="text" className="col-6 mb-2" placeholder="Digite o CEP" />
                            <p id="freteCalculado">{this.state.frete}</p>
                            <Button outline color="warning" >  <FaCheckCircle/> OK</Button>
                        <hr className="soft" />
                    </FormGroup>
                </Form>
          
        );
      }
}
