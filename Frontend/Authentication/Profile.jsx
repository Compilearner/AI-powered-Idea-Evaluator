import { FaUser } from "react-icons/fa";
import { useAuthStore } from "../Store/authStore";
import { IdeasShow } from "./IdeasShow";



export const Profile = () => {
const {user} = useAuthStore((state)=> state);
   

  return (
    <div className="h-full w-full bg-black flex flex-col justify-start gap-14 items-center pt-24 pb-6 ">
      {/** User Profile Container */}
        <div className=" w-2/5 h-36 flex flex-col justify-center items-center gap-4 border border-black rounded-full bg-white p-4">
             <span className=""><FaUser className=" w-full h-16 p-3 text-white bg-black rounded-full"/></span>
             <h2 className="libre-baskerville-bold  text-xl ">Username : {user.userName}</h2>
        </div>
       <IdeasShow/>
    </div>
  );

}
