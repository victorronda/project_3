import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';
import AnonRoutes from './components/auth/AnonRoutes';
import PrivateRoutes from './components/auth/PrivateRoutes';
import LoginAdmin from './pages/LoginAdmin';
import LoginEmployee from './pages/LoginEmployee';
import Signup from './pages/Signup';
import AuthProvider from './context/AuthProvider';
import MainAdmin from './pages/MainAdmin';
import Home from './pages/Home';

function App() {
  return (
    
    <AuthProvider>
      <Navbar/>
      <Switch>
        <AnonRoutes path='/admin/login' component={LoginAdmin} />
        <AnonRoutes path='/employee/login' component={LoginEmployee} />
        <AnonRoutes path='/signup' component={Signup} />
        <PrivateRoutes path='/home' component={MainAdmin} />
      </Switch>
      <Footer/>
    </AuthProvider>
  );
}

export default App;
