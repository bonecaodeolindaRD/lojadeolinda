import React, { Component } from 'react';
import { BrowserRouter, Switch,Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';
import Home from './components/Home';
import Register from './components/Register';
import Contact from './components/Contact';
import About from './components/About';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import List from './components/ProductsList';
import ProductDetail from './components/ProductDetail';
import ProductRegistration from './components/ProductRegistration'
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
            <Route path="/contact" exact component={Contact} />
            <Route path="/register" exact component={Register} />
            <Route path="/about" exact component={About}/>
            <Route path="/cart" exact component={Cart}/>
            <Route path="/list" exact component={List}/>
            <Route path="/login" exact component={Login} />
            <Route path="/detalhe" exact component={ProductDetail} /> 
            <Route path="/productregistration" exact component={ProductRegistration} /> 
            <PrivateRoute path="/account" exact component={Account} />
            <PrivateRoute path="/checkout" exact component={Checkout} />
        </Switch>
    </BrowserRouter>
);

export default Routes;