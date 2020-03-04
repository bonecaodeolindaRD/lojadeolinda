import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
// import Home from './components/Home';
// import Contato from './components/Contato';
import DetalharProduto from './components/DetalharProduto';
// import Carrinho from './components/Carrinho';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

function App() {
  return (
    <>
      <Header/>
       <DetalharProduto/>
      <Footer/>
    </>
  );
}

export default App;
