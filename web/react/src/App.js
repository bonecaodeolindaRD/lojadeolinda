import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
// import Home from './components/Home';
// import Contact from './components/Contact';
import ProductDetail from './components/ProductDetail';
// import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

function App() {
  return (
    <>
      <Header/>
       <ProductDetail/>
      <Footer/>
    </>
  );
}

export default App;
