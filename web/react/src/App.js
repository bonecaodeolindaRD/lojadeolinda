import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
// import Home from './components/Home';
import Contato from './components/Contato';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

function App() {
  return (
    <>
      <Header/>
       <Contato/>
      <Footer/>
    </>
  );
}

export default App;
