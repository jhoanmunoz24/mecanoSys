import './App.css';
import { Routes, Route } from 'react-router-dom';

import Register from './components/register';
import LoginForm from './components/login';
import AdminPanel from './components/adminPanel';
import RolTable from './components/RolTable';
import { useState } from 'react';
import createUser from './components/createUser';
function App() {

  const [activeTab,setActiveTab] = useState('Usuarios')
  
  return (
    <Routes>
      <Route
        path='/register'
        element={<Register />}
      ></Route>
      <Route
        path='/login'
        element={<LoginForm />}
      ></Route>
      <Route
        path='/'
        element={<LoginForm />}
      ></Route>
      <Route
        path='/adminPanel'
        element={<AdminPanel activeTab= {activeTab} setActiveTab={setActiveTab} />}
      ></Route>
    </Routes>


  );
}

export default App;
