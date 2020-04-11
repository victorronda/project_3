import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <Switch>
        <Route exact path='/' component='' />
      </Switch>
    </div>
  );
}

export default App;
