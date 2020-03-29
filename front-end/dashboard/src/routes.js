import React, { Component } from 'react';

import { BrowserRouter, Switch,Route } from 'react-router-dom';
import CreateProduct from './components/CreateProduct';
import AddItemToStock from './components/AddItemToStock';
import EditProduct from './components/EditProduct';
import Sales from './components/Sales';
import Products from './components/Products';
import Login from './components/Login';
import ManageOrder from './components/ManageOrder';
import ListOrders from './components/ListOrders';

export default class Routes extends Component {
  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/home" exact component={Products}/>
                <Route path="/create" exact component={CreateProduct}/>
                <Route path="/add" exact component={AddItemToStock}/>
                <Route path="/edit/:id?" exact component={EditProduct}/>
                <Route path="/sales" exact component={Sales}/>
                <Route path="/orders" exact component={ListOrders}/>
                <Route path="/manager/:id?" exact component={ManageOrder}/>
                <Route component={Products}/>
            </Switch>
        </BrowserRouter>
    )
  }
}
