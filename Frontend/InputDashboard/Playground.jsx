import { useState} from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../Store/authStore';
import { useNavigate } from 'react-router-dom';
import EvaluationOutput from './EvaluationOutput';


const Playground = () => {
const navigate = useNavigate();
const { register, handleSubmit, reset } = useForm();
const [isLoadingSpin, setIsLoadingSpin] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [response, setResponse] = useState({});
const [error, setError] = useState(false);


const {user, token } = useAuthStore((state) => state);

const onSubmit = async (data) => {
    console.log('Form submitted:', data);
    setIsLoading(true);
    setIsLoadingSpin(true);


    try{
        const res = await fetch("/api/evaluate-idea", {
            method : "POST",  
            headers: {
                    'Content-Type': 'application/json',  
                      },
            credentials: 'include',          
            body: JSON.stringify({ ...data, userID: user._id  || user.userId })
  
        });

        if(!res.ok){
           throw new Error('Server Error');
        }

        const newData = await res.json();
    
        // console.log(newData.evaluation);

        if(newData.evaluation ){
           setIsLoadingSpin(false);
            setResponse(newData.evaluation);
        }

    }catch(err){
        console.log(err);
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



  if(!token){
       navigate("/login-signup");
  }


  return (
    <div className={` w-full h-screen mx-auto flex flex-col justify-center gap-8  items-center relative py-12  mt-7  `}>
        <h2 className='text-4xl text center libre-baskerville-bold text-white'>Let's Test The Idea</h2>
      {/*** Modal window */}
      {
        isLoading  && ( <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-500">
            {
                isLoadingSpin ? (<div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>) 
                :(<EvaluationOutput output = {response}  setIsLoading={setIsLoading}  setResponse={setResponse} error={error} setError={setError} />)
            } 
        </div>)
      }

        <form onSubmit={handleSubmit(onSubmit)} className=' w-[80%] h-[60vh]  bg-gray-100 flex flex-col gap-12  px-8 py-8 border border-gray-400 rounded-xl'>
           
              {/** Idea Description */}
              <div className='w-full  shadow-md shadow-gray-400 rounded-md'>
                  {/* <label className='text-2xl libre-baskerville-bold ' >Idea Description</label> */}
                  <textarea className=' w-full rounded-md px-3 py-2 text-xl focus:outline-none libre-baskerville-regular ' {...register('idea',{required:true})} placeholder='Describe your idea....' rows={4} required/>
              </div>

              <div className='w-full flex justify-around items-center'>
              
              {/** Purpose */}
              <div className=' w-5/12 flex flex-col justify-center'>
                     {/* <label className='text-2xl libre-baskerville-bold '>Purpose to work on idea</label> */}
                   <select className='rounded-md p-4 focus:outline-none shadow-md shadow-gray-400 '  {...register('purpose', { required: true })}  required>
                        <option value="" className='text-gray-400 libre-baskerville-bold'>-- Select Purpose to work on idea--</option>
                        <option value="Learning">Learning</option>
                        <option value="Hackathon Project">Hackathon Project</option>
                        <option value="Resume Building">Resume Building</option>
                        <option value="Research">Research</option>
                        <option value="Other">Other</option>
                   </select>
              </div>

              {/** Skill level */}
               <div className=' w-5/12 flex justify-start items-center gap-9 '>
                   {/* <label className='text-2xl libre-baskerville-bold '>Skill level</label> */}
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
               <div className='flex justify-center items-center gap-6'>
                  <button type='button' onClick={handleReset} className='text-xl w-[25%] h-11 rounded-md px-2 bg-black text-white libre-baskerville-bold hover:bg-gray-400 transition-all ease-in-out duration-300 '>Reset Input</button>
                  <button type='submit' className='text-xl w-[25%] h-11 rounded-md px-2 bg-green-700 text-white libre-baskerville-bold hover:bg-gray-400 transition-all ease-in-out duration-300 '>Evaluate Idea</button>
               </div>
        </form>
    </div>
  )
}

export default Playground