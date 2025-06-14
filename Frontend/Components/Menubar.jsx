import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import navItems from "./NavItems";
import { useAuthStore } from "../Store/authStore";
import { useLocation, Link } from "react-router-dom";


const Menubar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {user } = useAuthStore((state)=> state)
    const location = useLocation();
    const showFeedback = location.pathname === '/';



  return (
    <div className=" flex flex-col justify-start md:justify-center items-center gap-2 min-w-fit min-h-fit md:hidden bg-white py-2 px-3 rounded-md relative" >
      {
        !isMenuOpen ? (<button className="w-10" onClick={()=>setIsMenuOpen(true)} aria-label="Open navigation menu" ><FaBars className="text-2xl w-full text-black"/></button>):
        (<button className="w-10" onClick={()=>setIsMenuOpen(false)}  aria-label="Close navigation menu" ><FaTimes className="w-full text-2xl text-black"/></button>)
      } 

       {
        isMenuOpen && (
          <div className=" flex flex-col justify-center bg-white items-center gap-2 min-w-fit w-32 min-h-fit shadow-md rounded-md absolute z-50 top-10 p-4 md:p-6">
          {navItems.map((Item, index) => (
              <Link key={index} to={Item.to} className="mx-2 text-base sm:text-lg md:text-lg xl:text-xl font-semibold libre-baskerville-bold hover:underline decoration-slate-400 underline-offset-4">
                 { (user && Item.item === "Get Started") ? "Playground" :  Item.item}
              </Link>
           ))}

          {
            showFeedback && <a href="#feedback" className="mx-2 text-base sm:text-lg md:text-lg xl:text-xl font-semibold libre-baskerville-bold hover:underline decoration-slate-400 underline-offset-4">Feedback</a>
          }
           </div> )
       } 

    </div>
  )
}

export default Menubar