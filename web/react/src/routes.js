import React, { Component } from 'react';
import { BrowserRouter, Switch,Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';
import Home from './components/Login';
import Register from './components/Register';
import { isAuthenticated } from "./services/auth";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

  const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/account" exact component={Account} />
        </Switch>
    </BrowserRouter>
);

export default Routes;