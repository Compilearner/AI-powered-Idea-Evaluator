import { FaUser } from "react-icons/fa";
import { useAuthStore } from "../Store/authStore";
import { useEffect } from "react";


export const Profile = () => {
   const {user, fetchIdeas, ideas} = useAuthStore((state)=> state);
   
   useEffect(()=>{
        fetchIdeas(user.userId);
        console.log(ideas);
   },[fetchIdeas]);

  return (
    <div className="h-full w-full  bg-black flex flex-col justify-start gap-14 items-center pt-24 pb-6 ">
      {/** User Profile Container */}
        <div className=" w-2/5 h-36 flex flex-col justify-center items-center gap-4 border border-black rounded-full bg-gray-200 p-4">
             <span className=""><FaUser className=" w-full h-16 p-3 text-white bg-black rounded-full"/></span>
             <h2 className="libre-baskerville-bold  text-xl ">Username : {user.userName}</h2>
        </div>

        {/** Idea History Container */}
        <div className="w-2/3 flex- flex-col justify-center items-center  border bg-white  rounded-xl p-6">
        <h2 className="libre-baskerville-bold  text-2xl text-center  mb-4">Ideas History</h2>
           {
             ideas.map((idea)=>{
              return (
                <div key={idea._id} className="rounded-lg p-4 mt-4 text-center w-full bg-gray-200 shadow shadow-gray-300">
                  <p className="ibre-baskerville-bold  text-lg">{idea.description}</p>
                </div>
              )
             }) 
           }
        </div>
      </div>
  );

}
