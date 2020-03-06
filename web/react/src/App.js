import React from 'react';
import Header from './components/Header';
//import Footer from './components/Footer';
import { PaginaDeProdutos } from './components/ListaDeProdutos';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import { Produto } from './components/Produto';


function App() {
  return (
    <>
      <Header />
      < PaginaDeProdutos /> 
      <Produto/>
        {/* <Footer/> */}
     </>
    
  );
}

export default App;
