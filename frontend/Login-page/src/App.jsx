import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Login from './pages/Login';   // Adjust path based on your folder structure
import Signup from './pages/Signup';
import Home from './pages/Home';
import 'react-toastify/ReactToastify.css'
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to='/Login'/>}/>  
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/Home' element={<Home />}></Route>
        <Route path='/Login' element={<Login />}></Route>
      </Routes>
    </div>
  )
}

export default App