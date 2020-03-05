import React, { Component } from 'react';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';
import Home from './components/Login'

export default class Routes extends Component{
    render(){
        return (
            <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/home" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/account" exact component={Account} />
            </Switch>
            </BrowserRouter>
        )
    }
}