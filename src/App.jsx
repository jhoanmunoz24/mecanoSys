import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Register from './components/register';
import LoginForm from './components/login';
import AdminPanel from './components/adminPanel';
import RolTable from './components/RolTable';
import { useState, useEffect } from 'react';
import createUser from './components/createUser';
function App() {

  const [activeTab,setActiveTab] = useState('Usuarios')

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica si hay token al iniciar
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);
  return (

    
    <Routes>
      <Route
        path='/register'
        element={<Register />}
      ></Route>
      <Route
        path='/login'
        element={isLoggedIn ? <Navigate to='/adminPanel' /> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>}
      ></Route>
      <Route
        path='/'
        element={isLoggedIn ? <Navigate to='/adminPanel' /> : <Navigate to='/login' />}
      ></Route>
      <Route
        path='/adminPanel'
        element={isLoggedIn ? (<AdminPanel activeTab= {activeTab} setActiveTab={setActiveTab}  setIsLoggedIn={setIsLoggedIn}/>) : (
          <Navigate to ='/login' />
        )}
      ></Route>
    </Routes>


  );
}

export default App;
