import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import AddDish from './components/Particulares/admin/AddDish';
import AddMenu from './components/Particulares/admin/AddMenu';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';

function App() {
  return (
    
    <div>
      <Navbar/>
      <Switch>
        <Route path='/dishes/add' component={AddDish} />
        <Route path='/menus/add' component={AddMenu} />
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
