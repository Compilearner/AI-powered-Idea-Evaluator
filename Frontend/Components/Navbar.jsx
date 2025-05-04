import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { useAuthStore } from "../Store/authStore";

const navItems = [
  {
    item: "Home",
    to: "/",
  },
  {
    item: "Feedback",
    to: "/feedback",
  },
  {
    item: "Get Started",
    to: "/playground",
  },
];

const Navbar = () => {
const {user} = useAuthStore((state)=>state);

  return (
    <nav className="flex w-full h-24 justify-around items-center">
      <div className="flex justify-center items-center gap-9 w-2/3 h-12 rounded-2xl p-6 border border-gray-500">
        {navItems.map((Item, index) => (
          <Link key={index} to={Item.to} className="mx-2 text-lg font-semibold libre-baskerville-bold hover:underline decoration-slate-400 underline-offset-4">
            { (user && Item.item === "Get Started") ? "Playground" :  Item.item}
          </Link>
        ))}
      </div>
       <UserButton/>
    </nav>
  );
};

export default Navbar;
