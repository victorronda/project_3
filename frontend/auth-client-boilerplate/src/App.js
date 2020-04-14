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
<<<<<<< HEAD
import MainEmployee from './pages/MainEmployee'
import AddDish from './components/Particulares/admin/AddDish';
import AddMenu from './components/Particulares/admin/AddMenu';
=======
import Staff from './components/particulares/admin/Staff';
>>>>>>> develop

function App() {
  return (
    
    <AuthProvider>
      <Navbar/>
      <Switch>
        <AnonRoutes path='/admin/login' component={LoginAdmin} />
        <AnonRoutes path='/employee/login' component={LoginEmployee} />
        <AnonRoutes path='/signup' component={Signup} />
        <PrivateRoutes path='/home' component={Home} />
        <PrivateRoutes path='/main/employee' component={MainEmployee} />
        <PrivateRoutes path='/dishes/add' component={AddDish} />
        <PrivateRoutes path='/menus/add' component={AddMenu} />
        <PrivateRoutes exact path='/' component={Home} />
        <PrivateRoutes exact path='/profile' component={MainAdmin} />
        <PrivateRoutes exact path='/staff' component={Staff} />
      </Switch>
      <Footer/>
    </AuthProvider>
  );
}

export default App;
