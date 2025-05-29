import { Link, useLocation } from "react-router-dom";
import UserButton from "./UserButton";
import { useAuthStore } from "../Store/authStore";
import { useRef, useState, useEffect } from "react";
import {useWindowScroll} from 'react-use';
import {gsap} from "gsap";



const navItems = [
  {
    item: "Home",
    to: "/",
  },
  {
    item: "Get Started",
    to: "/playground",
  },
];

const Navbar = () => {
const location = useLocation();
const showFeedback = location.pathname === '/';

const {user} = useAuthStore((state)=>state);
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
    <nav className="flex w-full h-20 justify-around items-center fixed inset-x-0 border-none top-2 z-50 bg-white" ref={navRef}>
      <div className="flex justify-center items-center gap-9 w-2/3 h-12 rounded-2xl p-6 border border-gray-500">
        {navItems.map((Item, index) => (
          <Link key={index} to={Item.to} className="mx-2 text-lg font-semibold libre-baskerville-bold hover:underline decoration-slate-400 underline-offset-4">
            { (user && Item.item === "Get Started") ? "Playground" :  Item.item}
          </Link>
        ))}

      {
        showFeedback && <a href="#feedback" className="mx-2 text-lg font-semibold libre-baskerville-bold hover:underline decoration-slate-400 underline-offset-4">Feedback</a>
      }

      </div>
       <UserButton/>
    </nav>
  );
};

export default Navbar;
