import { useState , useEffect} from "react";
import {  FaChevronDown, FaChevronUp, FaPowerOff, FaUser } from "react-icons/fa"
import { Link , useNavigate} from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import {toast} from "react-hot-toast"


const UserButton = () => {

const [isOpen , setIsOpen] = useState(false);
const navigate = useNavigate();
const { logout, user } = useAuthStore();
const [userState, setUserState] = useState(user);

useEffect(() => {
    // console.log(user);  // This will log the user state whenever it changes
    setUserState(user);
}, [user]);



const handleLogout = async ()=>{
    try{
    const res = await logout();

    // console.log(res);
    // console.log(user);

    if(res.success){
        toast.success(res.message);
    
          navigate("/");
        
        }else{
          toast.error(res.message);
      }

 }catch(err){
        console.log(err);
    }
}  

  return userState ?(
    <div className={`flex flex-col justify-center items-center gap-2 w-[30%] p-4 `} onClick={() => setIsOpen(true)} onMouseEnter={() => setIsOpen(true)}  onMouseLeave={() => setIsOpen(false)}>
      <button className="flex justify-center items-center gap-2" aria-label="open user menu">
          <span className=""><FaUser className="text-white bg-black size-8 border rounded-full p-1 border-gray-300"/></span>
          <span >
          { isOpen ? (<FaChevronUp className="text-black size-4 cursor-pointer"/>)  : (<FaChevronDown className="text-black size-4 cursor-pointer"/>)
          }
          </span>
      </button>
       {
        isOpen && (
          <div className="flex flex-col justify-center items-center gap-4 w-32 h-24 bg-white p-5 shadow-lg rounded-md absolute z-50 top-14">
           <Link to={"/profile"}>
              <div className="flex justify-center items-center gap-2">
              <span><FaUser className="text-white bg-black size-6 border rounded-full p-1 border-gray-300"/></span>
              <a >Profile</a>
            </div>
           </Link> 
            <div className="flex justify-center items-center gap-2 cursor-pointer" onClick={handleLogout}>
              <span><FaPowerOff className="text-white bg-black size-6 border rounded-full p-1 border-gray-300"/></span>
              <a>Logout</a>
            </div>
          </div>
        )
       }
    </div>
  ):(
    <Link to={'/login-signup'}>
         <button className=" w-[9rem] sm:w-[10rem] h-12 libre-baskerville-bold text-base sm:text-lg  text-white  px-4 py-1 rounded-md bg-black">Login / Sign Up</button>
    </Link>
  )
}

export default UserButton