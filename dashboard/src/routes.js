import React, { Component } from 'react';

import { BrowserRouter, Switch,Route } from 'react-router-dom';
import CreateProduct from './components/CreateProduct';
import AddItemToStock from './components/AddItemToStock';
import EditProduct from './components/EditProduct';
import Sales from './components/Sales';
import Products from './components/Products';

export default class Routes extends Component {
  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Products}/>
                <Route path="/create" exact component={CreateProduct}/>
                <Route path="/add" exact component={AddItemToStock}/>
                <Route path="/edit/:id" exact component={EditProduct}/>
                <Route path="/sales" exact component={Sales}/>
            </Switch>
        </BrowserRouter>
    )
  }
}
