import {  useState } from "react";
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import toast from "react-hot-toast";


const AuthPage = () => {
 const [newUser, setNewUser] = useState({userName:"", email:"", password:""});
 const [isRegister, setIsRegister] = useState(true);
 const navigate = useNavigate();

 const {login, register } = useAuthStore((state) => state);
 const [errors, setErrors] = useState({});
 const [loginState, setLoginState] = useState(false);

 const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

     if(!loginState && !newUser.userName){
      newErrors.userName = "Username is required";
     }

    if(!newUser.email){
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(newUser.email)) {
        newErrors.email = 'Invalid email format';
    }
  
    if(!newUser.password){
      newErrors.password = "Password is required";
    }
    else if (!passwordRegex.test(newUser.password)) {
        newErrors.password = 'Password must be at least 6 characters and includes a digit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


 const handleRegister = async (e)=>{
     e.preventDefault();

     try{
        
        const result = validate();

        if(result){

          const res = await register(newUser);
          if(res.success){
             toast.success(res.message);
            //  setNewUser({userName:"", email:"", password:""});

             {/** TAKE SOME TIME TO SHOW UP FOR TOAST BEFORE NAVIGATING */}
             setTimeout(()=>{
                navigate("/");
             },2000);

        }else{
          toast.error(res.message);
        }
      }else{
          return;
        }

     }catch(err){
          console.log(err);
     }
 }

  const handleLogin = async (e)=>{
       e.preventDefault();
    try{

       
        console.log(loginState);

        const result = validate();
        console.log(result);
        console.log(errors);

        if(result){
            const res =  await login(newUser);
            console.log(res);
       
            if(res.success){
              toast.success(res.message);
            //  setNewUser({ email:"", password:""});

             {/** TAKE SOME TIME TO SHOW UP FOR TOAST BEFORE NAVIGATING */}
             setTimeout(()=>{
                navigate("/");
             },2000);
        }else{
          toast.error(res.message);
        }

        }else{
            return;
        }

     }catch(err){
          console.log(err);
     }
 }

    
 const handleState = ()=>{
   setIsRegister(!isRegister);
   setLoginState(!loginState);
 }

  return (
  <div className="h-screen w-full bg-black flex justify-center gap-[11rem] md:gap-[8rem] items-center max-lg:gap-0  " >
    <div className="w-1/2 h-screen hidden min-lg:inline-block ">
        <img src={"/Images/person.jpg"} className="object-cover h-full "/>
    </div>
     <div  className=" lg:w-[37vw] min-h-fit tall:h-[50vh] short:h-[70vh] xl:w-[35%] max-lg:w-[52%] md:w-[45%] bg-transparent border min-lg:mr-32 border-slate-300 rounded-lg z-[100]  flex flex-col justify-center items-center gap-[2rem] tall:gap-14 relative p-[1rem]  max-small:w-[80%] "> 
         <div className="border border-white bg-white p-[1.5rem] rounded-full size-[5rem] absolute top-[-2.5rem]">
             <FaUser className="text-black text-lg w-[2rem] h-[2rem] "/>
         </div>
         <h1 className="text-2xl text-white font-semibold mt-10">{isRegister ? "Create an Account" : "Login into your Account"}</h1>
         {
          isRegister ? (
            <form className="w-full flex flex-col justify-center items-center gap-[1.5rem] overflow-hidden ">
              <div className="w-full flex flex-col gap-2">
                <div className="flex w-full justify-center items-center">
                    <span className="bg-gray-100 p-[.6rem]"><FaUser  className="text-gray-400 text-lg"/></span>
                    <input className="bg-gray-300 pl-[.4rem] text-lg w-[70%] h-full focus:outline-none max-[389px]:text-[1rem]" name="userName" type="text" placeholder="Username" value={newUser.userName} onChange={(e)=>setNewUser({...newUser, userName: e.target.value})} required/>
                </div>
                {errors.userName && <p className="text-[.8rem] text-yellow-600 text-center">{errors.userName}</p>}
              </div>
              <div className="w-full flex flex-col gap-2">
                    <div className="flex w-full justify-center items-center">
                      <span className="bg-gray-100 p-[.6rem]"><FaEnvelope  className="text-gray-400 text-lg"/></span>
                      <input className="bg-gray-300 pl-[.4rem] text-lg w-[70%] h-full focus:outline-none max-[389px]:text-[1rem]" name="email"  type="email" placeholder="Email" value={newUser.email} onChange={(e)=>setNewUser({...newUser, email: e.target.value})} required/>
                </div>
                  {errors.email && <p className="text-[.8rem] text-yellow-600 text-center">{errors.email}</p>}
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="flex w-full justify-center items-center">
                    <span className="bg-gray-100 p-[.6rem]"><FaLock  className="text-gray-400 text-lg"/></span>
                    <input className="bg-gray-300 pl-[.4rem] text-lg w-[70%] h-full focus:outline-none max-[389px]:text-[1rem]" name="password"  type="password" placeholder="Password" value={newUser.password} onChange={(e)=>setNewUser({...newUser, password: e.target.value})} required/>
                </div>
                 {errors.password && <p className="text-[.8rem] text-yellow-600 text-center">{errors.password}</p>}
              </div>
                <div className="flex justify-center items-center gap-2 text-white mt-[-1.3rem]">
                    <h2 className="max-[389px]:text-[0.8rem]">Already have an account?</h2>
                    <button type="button" className="border-none text-blue-400 max-[389px]:text-[0.8rem]" onClick={handleState}>Login</button>
                </div>
                <button type="submit" className="px-[1rem] py-[.4rem] text-lg font-semibold bg-gray-300 w-[40%] h-[2.5rem] hover:bg-gray-500 max-[389px]:text-[0.9rem]" onClick={handleRegister}>Register</button>  
                </form> )    
               : (
             <form className="w-full flex flex-col justify-center items-center gap-[1.5rem] overflow-hidden p-[1rem]">
                 <div className="w-full flex flex-col gap-2">
                    <div className="flex w-full justify-center items-center">
                      <span className="bg-gray-100 p-[.6rem]"><FaEnvelope  className="text-gray-400 text-lg"/></span>
                      <input className="bg-gray-300 pl-[.4rem] text-lg w-[70%] h-full focus:outline-none max-[389px]:text-[1rem]" name="email"  type="email" placeholder="Email" value={newUser.email} onChange={(e)=>setNewUser({...newUser, email: e.target.value})} required/>
                </div>
                  {loginState && errors.email && <p className="text-yellow-600 w-full text-center text-[.8rem]" >{errors.email}</p>}
                </div>
                <div className="w-full flex flex-col gap-2">
                <div className="flex w-full justify-center items-center">
                    <span className="bg-gray-100 p-[.6rem]"><FaLock  className="text-gray-400 text-lg"/></span>
                    <input className="bg-gray-300 pl-[.4rem] text-lg w-[70%] h-full focus:outline-none max-[389px]:text-[1rem]" name="password"  type="password" placeholder="Password" value={newUser.password} onChange={(e)=>setNewUser({...newUser, password: e.target.value})} required/>
                </div>
                 {loginState && errors.password && <p className="text-yellow-600 text-center text-[.8rem]">{errors.password}</p>}
                </div>
                <button type="submit" className="px-[1rem] py-[.4rem] text-lg font-semibold bg-gray-300 w-[40%] h-[2.5rem] hover:bg-gray-500 max-[389px]:text-[0.8rem]"  onClick={handleLogin}>Login</button>  
            </form>
          )
         }
     </div>
  </div>

  );
};

export default AuthPage;
