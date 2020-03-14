import React from 'react';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';
import Home from './components/Home';
import Register from './components/Register';
import Contact from './components/Contact';
import About from './components/About';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
<<<<<<< HEAD
=======

import CreateProduct from './components/CreateProduct'

import Success from './components/Success';

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
>>>>>>> 68a48091aa64a397def7bce2bf002497df6c7885

  const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/register" exact component={Register} />
            <Route path="/about" exact component={About}/>
            <Route path="/cart" exact component={Cart}/>
          
            <Route path="/login" exact component={Login} />
<<<<<<< HEAD
            <Route path="/detalhe/:id" exact component={ProductDetail} />            
            <Route path="/account" exact component={Account} />
=======

            <Route path="/createproduct" exact component={CreateProduct} /> 

            <Route path="/detalhe/:id" exact component={ProductDetail} />   
            <Route path="/success" exact component={Success}/>         

            <PrivateRoute path="/account" exact component={Account} />
>>>>>>> 68a48091aa64a397def7bce2bf002497df6c7885
            <Route path="/checkout" exact component={Checkout} />
        </Switch>
    </BrowserRouter>
);

export default Routes;