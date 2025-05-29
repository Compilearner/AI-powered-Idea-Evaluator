import React, { useEffect } from 'react'
import AuthPage from '../Authentication/AuthPage'
import Home from '../Components/Home'
import {Route, Routes, useLocation } from "react-router-dom";
import { Profile } from '../Authentication/Profile';
import Playground from '../InputDashboard/Playground';
import { useAuthStore } from '../Store/authStore';
import Navbar from '../Components/Navbar';
import {AnimatePresence} from 'framer-motion';
import Feedback from '../Components/Feedback';



const App = () => {
 const location = useLocation(); 
const {autoLogin} = useAuthStore((state)=>state);
const showNavbar = location.pathname !== "/login-signup";

  useEffect(()=>{
        const check = async ()=>{
            const res = await autoLogin();

            console.log(res);
        }

        check();
  },[autoLogin]);


  return (
    <>
    { showNavbar && <Navbar/>}
    <AnimatePresence mode="wait">
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Navbar' element={<Navbar/>}/>
        <Route path='/login-signup' element={<AuthPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/playground' element={<Playground/>}/>
    </Routes>
    </AnimatePresence>
    </>
  )
}

export default App