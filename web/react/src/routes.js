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
import OrderHistory from './components/OrderHistory';
import SearchResult from './components/SearchResult';
import OrderDetails from './components/OrderDetail';
import Address from './components/Address';
import Success from './components/Success';
import Category from './components/Category';
import NotFound from './components/NotFound';
import RegisterAddress from './components/RegisterAddress';
import EditAccount from './components/EditAccount';


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
            <Route path="/detail/:id?" exact component={ProductDetail} />            
            <Route path="/account" exact component={Account} /> 
            <Route path="/success" exact component={Success}/>         
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/history" exact component={OrderHistory}/>
            <Route path="/search/:product?" exact component={SearchResult} />
            <Route path="/order/detail/:id?" exact component={OrderDetails} />
            <Route path="/category" exact component={Category} /> 
            <Route path="/address" exact component={Address} />
            <Route path="/registeraddress" exact component={RegisterAddress} />
            <Route path="/editaccount" exact component={EditAccount} />

            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;