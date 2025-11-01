
import './App.css';
import {Routes, Route} from 'react-router-dom';

import Register from './register';
import LoginForm from './login';
import AdminPanel from './adminPanel';
function App() {
  return (
    
      <Routes>
        <Route
          path='/register'
          element={<Register/>}
        ></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/' element ={<LoginForm/>}></Route>
        <Route path='/adminPanel' element = {<AdminPanel/>}></Route>
      </Routes>
    
  );
}

export default App;
