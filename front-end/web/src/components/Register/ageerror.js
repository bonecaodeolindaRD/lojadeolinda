import React, { Component } from "react";
import { Alert } from 'reactstrap';

class AlertAge extends Component{
    render(){
        return(
            <div className="AlertRegister">
                <Alert color="danger">
                    Somente podem realizar o cadastro pessoas acima de 18 anos
                </Alert>
            </div>
        )
    }
}

export default AlertAge;