import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';

function App() {
  return (
    
    <div>
      <Navbar/>
      <Switch>
        <Route exact path='/' component='' />
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
