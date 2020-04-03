import React, { Component } from "react";
import { Alert } from 'reactstrap';

class AlertCpf extends Component{
    render(){
        return(
            <div className="AlertRegister">
                <Alert color="danger">
                    CPF Inválido
                </Alert>
            </div>
        )
    }
}

export default AlertCpf;