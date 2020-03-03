import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Carrossel from './components/Carrossel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

function App() {
  return (
    <>
      <Header/>
        <Home/>
      <Footer/>
    </>
  );
}

export default App;
