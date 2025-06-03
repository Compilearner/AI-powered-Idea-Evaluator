import { useState} from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../Store/authStore';
import EvaluationOutput from './EvaluationOutput';



// const Playground = () => {
// const navigate = useNavigate();
// const { register, handleSubmit, reset } = useForm();
// const [isLoadingSpin, setIsLoadingSpin] = useState(false);
// const [isLoading, setIsLoading] = useState(false);
// const [response, setResponse] = useState({});
// const [error, setError] = useState(false);


// const {user, token, playground } = useAuthStore((state) => state);


// const onSubmit = async (data) => {
//     console.log('Form submitted:', data);
//     setIsLoading(true);
//     setIsLoadingSpin(true);


//         const res = await playground({...data, userID: user._id || user.userId});
  
//         if(res.success && res.evaluation) {
//             setIsLoadingSpin(false);
//             setResponse(res.evaluation);
//         }else{
//            setIsLoadingSpin(false);
//            setError(true);
//         }
       
//   };


//   const handleReset = ()=>{
//       reset({
//           idea: "",
//           purpose : undefined,
//           skillLevel : undefined
//       });
//   }


//   return token ? (
//     <div className={` w-full h-full mx-auto flex flex-col justify-center gap-8  items-center relative py-12  mt-7  `}>
//         <div className='w-full flex flex-col justify-center my-11 gap-2'>
//          <h2 className='text-4xl text center libre-baskerville-bold self-center'>Here is your playground to check your score</h2>   
//         <div className='text-xl text center flex justify-center gap-1 text-gray-400 libre-baskerville-regular  w-full text-center p-2 self-center'>
//             <p>Let's Test The Idea</p>
//             <span className='self-center'><FaLightbulb className='text-2xl '/></span>
//         </div>
            
//         </div>

//       {/*** Modal window */}
//       {
//         isLoading  && ( <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-500">
//             {
//                 isLoadingSpin ? (<div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>) 
//                 :(<EvaluationOutput output = {response}  setIsLoading={setIsLoading}  setResponse={setResponse} error={error} setError={setError} />)
//             } 
//         </div>)
//       }

//         <form onSubmit={handleSubmit(onSubmit)} className=' w-[60%] h-[55vh]  bg-gray-100 flex flex-col gap-12  px-8 py-8 border border-gray-400 rounded-xl'>
           
//               {/** Idea Description */}
//               <div className='w-full  shadow-md shadow-gray-400 rounded-md'>
//                   {/* <label className='text-2xl libre-baskerville-bold ' >Idea Description</label> */}
//                   <textarea className=' w-full rounded-md px-3 py-2 text-xl focus:outline-none libre-baskerville-regular ' {...register('idea',{required:true})} placeholder='Describe your idea....' rows={4} required/>
//               </div>

//               <div className='w-full flex justify-around items-center'>
              
//               {/** Purpose */}
//               <div className=' w-5/12 flex flex-col justify-center'>
//                      {/* <label className='text-2xl libre-baskerville-bold '>Purpose to work on idea</label> */}
//                    <select className='rounded-md p-4 focus:outline-none shadow-md shadow-gray-400 '  {...register('purpose', { required: true })}  required>
//                         <option value="" className='text-gray-400 libre-baskerville-bold'>-- Select Purpose to work on idea--</option>
//                         <option value="Learning">Learning</option>
//                         <option value="Hackathon Project">Hackathon Project</option>
//                         <option value="Resume Building">Resume Building</option>
//                         <option value="Research">Research</option>
//                         <option value="Other">Other</option>
//                    </select>
//               </div>

//               {/** Skill level */}
//                <div className=' w-5/12 flex justify-start items-center gap-9 '>
//                    {/* <label className='text-2xl libre-baskerville-bold '>Skill level</label> */}
//                    <select className='rounded-md p-4 focus:outline-none w-full shadow-md shadow-gray-400 '  {...register('skillLevel', { required: true })} required>
//                         <option value="">-- Select Skill Level --</option>
//                         <option value="No knowledge">No knowledge</option>
//                         <option value="Beginner">Beginner</option>
//                         <option value="Intermediate">Intermediate</option>
//                         <option value="Expert">Expert</option>
//                    </select>
//                </div>

//             </div>   

//                {/** Submit Button */}
//                <div className='flex justify-center items-center gap-6'>
//                   <button type='button' onClick={handleReset} className='text-xl w-[25%] h-11 rounded-md px-2 bg-black text-gray-400 libre-baskerville-bold hover:bg-gray-400 transition-all ease-in-out duration-300 '>Reset Input</button>
//                   <button type='submit' className='text-xl w-[25%] h-11 rounded-md px-2 bg-green-700 text-white libre-baskerville-bold hover:bg-gray-400 transition-all ease-in-out duration-300 '>Evaluate Idea</button>
//                </div>
//         </form>
//     </div>
//   ):
//   (navigate("/login-signup"))
// }

// export default Playground

import { FaHandPaper } from 'react-icons/fa';
// import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

const Playground = () => {
const navigate = useNavigate();
const { register, handleSubmit, reset } = useForm();
const [isLoadingSpin, setIsLoadingSpin] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [response, setResponse] = useState({});
const [error, setError] = useState(false);
// const responseRef = useRef(null);


const {user, token, playground } = useAuthStore((state) => state);

// useEffect(()=>{
//     responseRef.current.scrollIntoView({ behavior: 'smooth' });
// }, [isLoading]);


const onSubmit = async (data) => {
    console.log('Form submitted:', data);
    setIsLoading(true);
    setIsLoadingSpin(true);

        const res = await playground({...data, userID: user._id || user.userId});
  
        if(res.success && res.evaluation) {
            setIsLoadingSpin(false);
            setResponse(res.evaluation);
        }else{
           setIsLoadingSpin(false);
           setError(true);
        }
       
  };


  const handleReset = ()=>{
      reset({
          idea: "",
          purpose : undefined,
          skillLevel : undefined
      });
  }

  return token? (
    <section className='py-2 px-10 mb-12 mt-28'>
        <div className={` rounded-lg min-h-fit py-6 bg-gray-200 flex flex-col justify-center gap-40 `}>

           <div className='flex flex-col justify-center gap-[15rem]'>
              
              {/** Upper Container */}
            <div className='flex flex-col justify-center items-center gap-0 bg-transparent w-2/4 mx-auto rounded-lg p-2 '>
                <div className=' flex text-gray-600 justify-center gap-3'>
                    <span className='self-center '><FaHandPaper className='text-3xl text-black' /></span>
                    <h2 className='libre-baskerville-bold text-[2rem] text-center text-gray-600'> Hi, Creative Thinker</h2>
                </div>
                <h2 className='libre-baskerville-bold text-[2rem] text-center text-black mt-[-.8rem]'>Welcome to the Idea Playground</h2>
                <p className='libre-baskerville-regular text-[1rem]  text-justify text-gray-700'>Ready to test your ideas, launch your thoughts, validate them quickly using AI.</p>
                
            </div>

            {/** Input */}
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center gap-6'>
                {/** Input Idea */}
            <div className='w-[50%]  shadow-md shadow-gray-400 rounded-md'>                
                  <textarea className=' w-full rounded-md px-3 py-2 text-xl focus:outline-none libre-baskerville-regular' {...register('idea',{required:true})}  placeholder='Describe your idea....' rows={4} required/>
            </div>

            <div className='w-[60%] flex justify-around items-center'>
              
                             {/** Purpose */}
                             <div className=' w-5/12 flex flex-col justify-center'>
                                   
                                  <select className='rounded-md p-4 focus:outline-none shadow-md shadow-gray-400 '  {...register('purpose', { required: true })}  required>
                                       <option value="" className='text-gray-300 libre-baskerville-regular'>-- Select Purpose to work on idea--</option>
                                       <option value="Learning">Learning</option>
                                       <option value="Hackathon Project">Hackathon Project</option>
                                       <option value="Resume Building">Resume Building</option>
                                       <option value="Research">Research</option>
                                       <option value="Other">Other</option>
                                  </select>
                             </div>
              
                             {/** Skill level */}
                              <div className=' w-5/12 flex justify-start items-center gap-9 '>
                                  
                                  <select className='rounded-md p-4 focus:outline-none w-full shadow-md shadow-gray-400 '  {...register('skillLevel', { required: true })} required>
                                       <option value="">-- Select Skill Level --</option>
                                       <option value="No knowledge">No knowledge</option>
                                       <option value="Beginner">Beginner</option>
                                       <option value="Intermediate">Intermediate</option>
                                       <option value="Expert">Expert</option>
                                 </select>
                             </div>
              
                           </div> 
                        {/** Submit Button */}
                <div className=' w-[50%] flex justify-center items-center gap-6'>
                   <button onClick={handleReset} type='button' className='text-xl w-[25%] h-11 rounded-md px-2 bg-black text-gray-400 libre-baskerville-bold hover:bg-gray-600 transition-all ease-in-out duration-300 '>Reset Input</button>
                   <button type='submit'  className={`text-xl w-[25%] h-11 rounded-md px-2 bg-green-700 text-white libre-baskerville-bold hover:bg-gray-400 transition-all ease-in-out duration-300 ${isLoading || response ? "disabled:cursor-not-allowed" : ""} `}>Evaluate Idea</button>
               </div>

            </form>

           </div>
            
            {/** Response Container */}
           {
            isLoading && (<div  className='bg-black flex justify-center items-center  py-12'>

                       {
                         isLoadingSpin ? (<div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>) :
                         (<EvaluationOutput output = {response}  setIsLoading={setIsLoading}  setResponse={setResponse} error={error} setError={setError} />)
                       }  

            </div>)
           }
        </div>
    </section>
  ): (navigate('/login-signup'))
}

export default Playground