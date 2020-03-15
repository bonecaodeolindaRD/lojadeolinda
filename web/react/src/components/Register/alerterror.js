import React, { Component } from "react";
import { Alert } from 'reactstrap';

class AlertEvent extends Component{
    render(){
        return(
            <div className="AlertRegister">
                <Alert color="danger">
                    Erro ao cadastrar sua conta! Verifique se você já possui cadastro!
                </Alert>
            </div>
        )
    }
}

export default AlertEvent;