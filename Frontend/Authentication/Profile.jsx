import { FaUser } from "react-icons/fa";
import { useAuthStore } from "../Store/authStore";
import { IdeasShow } from "./IdeasShow";



export const Profile = () => {
const {user} = useAuthStore((state)=> state);
   

  return (
  <div className="h-full w-full relative flex flex-col justify-start gap-14 items-center pt-24 pb-6 ">

      {/** User Profile Container */}
      <div className="relative w-full h-[50vh] flex justify-center items-center bg-black border-b border-gray-400 max-sm:px-6">
        {/* Background image with black overlay */}
       <div className="absolute inset-0">
          <div className="w-[50vw] mx-auto h-full bg-[url('/Images/purpose.jpg')] bg-cover bg-center max-sm:w-full min-w-[40vw]">
          <div className="w-full h-full bg-black/80 "></div>
       </div>
      </div>

  {/* Foreground content */}
       <div className="relative z-10 flex flex-col items-center gap-4">
        <span>
           <FaUser className="w-24 h-24 p-3 bg-white rounded-full" />
        </span>
       <h2 className="text-[1.8rem]  text-white roboto-normal max-sm:text-[1.5rem]">{user.userName}</h2>
       </div>
      </div>
    <IdeasShow/>   
  </div>
       
  );

}
