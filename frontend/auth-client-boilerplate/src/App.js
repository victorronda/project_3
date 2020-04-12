import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import AddDish from './components/Particulares/admin/AddDish';
import AddMenu from './components/Particulares/admin/AddMenu';

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <Switch>
        <Route path='/dishes/add' component={AddDish} />
        <Route path='/menus/add' component={AddMenu} />
      </Switch>
    </div>
  );
}

export default App;
