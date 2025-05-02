import {  useState } from "react";
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";


const AuthPage = () => {
 const [newUser, setNewUser] = useState({userName:"", email:"", password:""})
 const [isRegister, setIsRegister] = useState(true);
 const navigate = useNavigate();

 const {login, register } = useAuthStore((state) => state);


 const handleRegister = async (e)=>{
     e.preventDefault();
     try{
        
        const res = await register(newUser);

        if(res.success){
            setNewUser({userName:"", email:"", password:""});
            navigate("/");
        }

     }catch(err){
          console.log(err);
     }
 }

  const handleLogin = async (e)=>{
       e.preventDefault();
    try{
       
       const res =  await login(newUser);
       console.log(res);
       
       if(res.success){
        setNewUser({ email:"", password:""});
            navigate("/");
        }

     }catch(err){
          console.log(err);
     }
 }


    

  return (
  <div className="h-screen w-full bg-black flex justify-between items-center " >
    <div className="w-1/2 h-screen">
        <img src={"Images/person.jpg"} className="object-cover w-full h-full"/>
    </div>
     <div  className="w-[30vw] h-[60vh]  bg-transparent border mr-32 border-slate-300 rounded-lg z-[100]  flex flex-col justify-center items-center gap-[2rem] relative"> 
         <div className="border border-white bg-white p-[1.5rem] rounded-full size-[5rem] absolute top-[-2.5rem]">
             <FaUser className="text-black text-lg w-[2rem] h-[2rem] "/>
         </div>
         <h1 className="text-2xl text-white font-semibold mt-10">{isRegister ? "Create an Account" : "Login into your Account"}</h1>
         {
          isRegister ? (
            <form className="w-full flex flex-col justify-center items-center gap-[1.5rem] overflow-hidden p-[1rem]">
                <div className="flex w-full justify-center items-center">
                    <span className="bg-gray-100 p-[.6rem]"><FaUser  className="text-gray-400 text-lg"/></span>
                    <input className="bg-gray-300 pl-[.4rem] text-lg w-[70%] h-full focus:outline-none" type="text" placeholder="Username" value={newUser.userName} onChange={(e)=>setNewUser({...newUser, userName: e.target.value})}/>
                </div>
                <div className="flex w-full justify-center items-center">
                   <span className="bg-gray-100 p-[.6rem]"><FaEnvelope  className="text-gray-400 text-lg"/></span>
                    <input className="bg-gray-300 pl-[.4rem] text-lg w-[70%] h-full focus:outline-none"  type="email" placeholder="Email" value={newUser.email} onChange={(e)=>setNewUser({...newUser, email: e.target.value})}/>
                </div>
                <div className="flex w-full justify-center items-center">
                    <span className="bg-gray-100 p-[.6rem]"><FaLock  className="text-gray-400 text-lg"/></span>
                    <input className="bg-gray-300 pl-[.4rem] text-lg w-[70%] h-full focus:outline-none"  type="password" placeholder="Password" value={newUser.password} onChange={(e)=>setNewUser({...newUser, password: e.target.value})}/>
                </div>
                <div className="flex justify-center items-center gap-2 text-white mt-[-1.3rem]">
                    <h2>Already have an account?</h2>
                    <button className="border-none text-blue-400" onClick={()=>setIsRegister(!isRegister)}>Login</button>
                </div>
                <button className="px-[1rem] py-[.4rem] text-lg font-semibold bg-gray-300 w-[40%] h-[2.5rem] hover:bg-gray-500" onClick={handleRegister}>Register</button>  
                </form> )    
               : (
             <form className="w-full flex flex-col justify-center items-center gap-[1.5rem] overflow-hidden p-[1rem]">
                 <div className="flex w-full justify-center items-center">
                   <span className="bg-gray-100 p-[.6rem]"><FaEnvelope  className="text-gray-400 text-lg"/></span>
                    <input className="bg-gray-300 pl-[.4rem]  text-lg w-[70%] h-full focus:outline-none"  type="email" placeholder="Email" value={newUser.email} onChange={(e)=>setNewUser({...newUser, email: e.target.value})}/>
                </div>
                <div className="flex w-full justify-center items-center">
                    <span className="bg-gray-100 p-[.6rem]"><FaLock  className="text-gray-400 text-lg"/></span>
                    <input className="bg-gray-300 pl-[.4rem]  text-lg w-[70%] h-full focus:outline-none"  type="password" placeholder="Password" value={newUser.password} onChange={(e)=>setNewUser({...newUser, password: e.target.value})}/>
                </div>
                <button className="px-[1rem] py-[.4rem] text-lg font-semibold bg-gray-300 w-[40%] h-[2.5rem] hover:bg-gray-500"  onClick={handleLogin}>Login</button>  
            </form>
          )
         }
     </div>
  </div>

  );
};

export default AuthPage;
