import React from 'react';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import Header from './components/Header';
import { Product } from './components/ListaDeProdutos/ListaProdutos';


function App() {
  return (
    <>

      <Header/>
      <Product/> 
      <Routes />

    </>

  );
}

export default App;
