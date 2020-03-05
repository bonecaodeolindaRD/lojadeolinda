import React, { Component } from 'react';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';

export default class Routes extends Component{
    render(){
        return (
            <BrowserRouter>
            <Switch>
            <Route path="/Login" exact component={Login} />
            <Route path="/Account" exact component={Account} />
            </Switch>
            </BrowserRouter>
        )
    }
}