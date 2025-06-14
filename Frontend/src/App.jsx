import  { useEffect, useRef, useState } from 'react'
import AuthPage from '../Authentication/AuthPage'
import {Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from '../Store/authStore';
import Navbar from '../Components/Navbar';
import gsap from 'gsap';
import { useWindowScroll } from 'react-use';
import UserButton from '../Components/UserButton';
import Home from '../Components/Home';
import { Profile } from '../Authentication/Profile';
import Playground from '../InputDashboard/Playground';


const App = () => {
const {autoLogin} = useAuthStore((state)=>state);

{/** On every re-load, it auto-login */}
  useEffect(()=>{
        const check = async ()=>{
            const res = await autoLogin();

            console.log(res);
        }

        check();
  },[autoLogin]);

  const location = useLocation();
  const showNavbar = location.pathname !== "/login-signup";
 
  
  const navRef = useRef(null);
  
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const {y: currentScrollY} = useWindowScroll();
  
  useEffect(()=>{
    {/** No Scroll-Just at top */}
    if(currentScrollY === 0){
      setIsNavVisible(true);
      navRef.current.classList.remove('floating-nav');
    }else if(currentScrollY > lastScrollY){
      /** Just going down */ 
      setIsNavVisible(false);
      navRef.current.classList.remove('floating-nav');
    }else if(currentScrollY < lastScrollY){
      /** Going Up */
      setIsNavVisible(true);
      navRef.current.classList.add('floating-nav');
    }
     setLastScrollY(currentScrollY);
  },[currentScrollY,lastScrollY]);
  
  useEffect(()=>{
    gsap.to(navRef.current,{
       y: isNavVisible ? 0 : -100,
       opacity: isNavVisible ? 1 : 0,
       duration : 0.2, 
    })
  },[isNavVisible]);  


  return (
<>
    {
      showNavbar && (
        <header className="w-full h-20 fixed inset-0 z-50 flex justify-between md:justify-center items-center gap-8 md:gap-10 px-4" ref={navRef}>
          <Navbar/>
          <UserButton />
        </header>
      )
     }

    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login-signup' element={<AuthPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/playground' element={<Playground/>}/>
    </Routes>

</>
  )
}

export default App