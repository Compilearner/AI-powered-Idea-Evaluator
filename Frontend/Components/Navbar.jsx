import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import navItems from "./NavItems";
import Menubar from "./Menubar";


const Navbar = () => {
const location = useLocation();
const showFeedback = location.pathname === '/';

const {user} = useAuthStore((state)=>state);

  return (
    <nav className="flex justify-start md:justify-center items-center  min-w-fit w-[30%] md:w-[55%] h-12 rounded-2xl p-6 md:border border-gray-500" >

      {/** Above Small */}
      <div className=" hidden md:flex  justify-center items-center gap-9 ">
      {navItems.map((Item, index) => (
          <Link key={index} to={Item.to} className="mx-2 text-base sm:text-lg md:text-xl xl:text-lg font-semibold libre-baskerville-bold hover:underline decoration-slate-400 underline-offset-4">
            { (user && Item.item === "Get Started") ? "Playground" :  Item.item}
          </Link>
        ))}

      {
        showFeedback && <a href="#feedback" className="mx-2 text-base sm:text-lg md:text-xl xl:text-lg  font-semibold libre-baskerville-bold hover:underline decoration-slate-400 underline-offset-4">Feedback</a>
      }
      </div>
      <Menubar/>
    </nav>
  );
};

export default Navbar;
