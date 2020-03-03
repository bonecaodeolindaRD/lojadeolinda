import React, { Component } from 'react';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import Login from './components/Login';

export default class Routes extends Component{
    render(){
        return (
            <BrowserRouter>
            <Switch>
            <Route path="/Login" exact component={Login} />
            </Switch>
            </BrowserRouter>
        )
    }
}