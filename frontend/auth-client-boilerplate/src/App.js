import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';
import LoginAdmin from './pages/LoginAdmin';
import LoginEmployee from './pages/LoginEmployee';
import Signup from './pages/Signup';
import AuthProvider from './context/AuthProvider';
import Home from './pages/Home';
import MainEmployee from './pages/MainEmployee'
import AddDish from './components/particulares/admin/AddDish';
import AddMenu from './components/particulares/admin/AddMenu';
import Staff from './components/particulares/admin/Staff';
import MainAdmin from './pages/MainAdmin';
import AnonRoutes from './components/auth/AnonRoutes';
import PrivateRoutes from './components/auth/PrivateRoutes';
import PrivateRoutesEmployee from './components/auth/PrivateRoutesEmployee';
import FinalMessage from './pages/FinalMessage';
import Pay from './pages/Pay';
import MyTable from './components/particulares/admin/MyTable';
import Menu from './components/global/Menu';

function App() {
  return (
    
    <AuthProvider>
      <Navbar/>
      <Switch>
        <AnonRoutes exact path='/' component={Home} />
        <AnonRoutes exact path='/admin/login' component={LoginAdmin} />
        <AnonRoutes exact path='/employee/login' component={LoginEmployee} />
        <AnonRoutes exact path='/signup' component={Signup} />
        <AnonRoutes exact path='/main/employee' component={MainEmployee} />
        <AnonRoutes exact path='/menu' component={Menu} />
        <PrivateRoutes exact path='/dishes/add' component={AddDish} />
        <PrivateRoutes exact path='/menus/add' component={AddMenu} />
        <PrivateRoutes exact path='/profile' component={MainAdmin} />
        <PrivateRoutes exact path='/staff' component={Staff} />
        <PrivateRoutes exact path='/thankyou' component={FinalMessage} />
        <PrivateRoutes exact path='/pay' component={Pay} />
        <PrivateRoutes exact path='/tables' component={MyTable} />
      </Switch>
      <Footer/>
    </AuthProvider>
  );
}

export default App;
