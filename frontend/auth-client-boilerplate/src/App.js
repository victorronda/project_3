import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/global/Footer';
import LoginAdmin from './pages/LoginAdmin';
import LoginEmployee from './pages/LoginEmployee';
import Signup from './pages/Signup';
import AuthProvider from './context/AuthProvider';
import Home from './pages/Home';
import MainEmployee from './pages/MainEmployee'
import AddDish from './components/particulares/admin/AddDish';
import AddMenu from './components/particulares/admin/AddMenu';
import MainAdmin from './pages/MainAdmin';
import FinalMessage from './pages/FinalMessage';
import Pay from './pages/Pay';
import MyTable from './components/particulares/admin/MyTable';
import MenuAdmin from './components/particulares/admin/MenuAdmin';
import MenuClient from './components/particulares/client/MenuClient';
import OrderInfo from './components/particulares/admin/OrderInfo';
import AnonRoutes from './components/auth/AnonRoutes';
import PrivateRoutes from './components/auth/PrivateRoutes';

function App() {
  return (
    
    <AuthProvider>
      <Switch>
        <AnonRoutes exact path='/' component={Home} />
        <AnonRoutes exact path='/admin/login' component={LoginAdmin} />
        <AnonRoutes exact path='/employees/login' component={LoginEmployee} />
        <AnonRoutes exact path='/signup' component={Signup} />
        <AnonRoutes exact path='/main/employee' component={MainEmployee} />
        <AnonRoutes exact path='/menu' component={MenuClient} />
        <PrivateRoutes exact path='/dishes/add' component={AddDish} />
        <PrivateRoutes exact path='/menus/add' component={AddMenu} />
        <PrivateRoutes exact path='/menus/admin' component={MenuAdmin} />
        <PrivateRoutes exact path='/profile' component={MainAdmin} />
        <PrivateRoutes exact path='/thankyou' component={FinalMessage} />
        <PrivateRoutes exact path='/pay' component={Pay} />
        <PrivateRoutes exact path='/tables' component={MyTable} />
        <PrivateRoutes exact path='/admin/orderinfo' component={OrderInfo} />
      </Switch>
      <Footer/>
    </AuthProvider>
  );
}

export default App;
