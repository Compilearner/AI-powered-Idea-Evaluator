import React from 'react'
import AuthPage from '../Authentication/AuthPage'
import Home from '../Components/Home'
import {Route, Routes } from "react-router-dom";
import { Profile } from '../Authentication/Profile';
import Playground from '../InputDashboard/Playground';

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login-signup' element={<AuthPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/playground' element={<Playground/>}/>
    </Routes>
  )
}

export default App