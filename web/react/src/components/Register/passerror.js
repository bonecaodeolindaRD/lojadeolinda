import React, { Component } from "react";
import { Alert } from 'reactstrap';

class AlertPass extends Component{
    render(){
        return(
            <div className="AlertRegister">
                <Alert color="danger">
                    Senha e confirmação de senha divergentes!
                </Alert>
            </div>
        )
    }
}

export default AlertPass;