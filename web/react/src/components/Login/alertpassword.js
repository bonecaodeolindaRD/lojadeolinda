import React, { Component } from "react";
import { Alert } from 'reactstrap';

class AlertPassword extends Component{
    render(){
        return(
            <div className="AlertRegister">
                <Alert color="danger">
                    Erro ao logar! Senha incorreta.
                </Alert>
            </div>
        )
    }
}

export default AlertPassword;