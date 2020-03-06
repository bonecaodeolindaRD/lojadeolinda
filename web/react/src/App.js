import React from 'react';

import { PaginaDeProdutos } from './components/ListaDeProdutos';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import { Produto } from './components/Produto';
import Header from './components/Header';


function App() {
  return (
    <>
      <Header/>
      < PaginaDeProdutos /> 
      <Produto/>
       
     </>
    
  );
}

export default App;
