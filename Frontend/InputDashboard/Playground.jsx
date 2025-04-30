import { useState } from 'react';
import { useForm } from 'react-hook-form';



const Playground = () => {

const { register, handleSubmit } = useForm();
const [isLoadingSpin, setIsLoadingSpin] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [response, setResponse] = useState("");

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
            body: JSON.stringify(data)   
        })

        const newData = await res.json();
        console.log(newData.evaluation);
        setIsLoadingSpin(false);
        setResponse(newData.evaluation);
    }catch(err){
        console.log(err);
    }
  };


  return (
    <div className="bg-[url('Images/hidden.jpg')] bg-cover  w-[90%] h-screen mx-auto flex justify-center items-center relative">
      {/*** Modal window */}
      {
        isLoading  && ( <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-500">
            {
                isLoadingSpin ? (<div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>) :(<div className="text-center z-100 bg-white">{response}</div>)
            } 
        </div>)
      }

        <form onSubmit={handleSubmit(onSubmit)} className=' w-[55%] h-screen bg-black flex flex-col justify-center items-center gap-8 mr-11 px-4'>
             <h1 className=" text-center text-black text-5xl bg-white p-6 libre-baskerville-bold rounded-lg w-full ">Idea Playground</h1>
              {/** Idea Description */}
              <div className='w-full'>
                  <label className='text-2xl libre-baskerville-bold text-white' >Idea Description</label>
                  <textarea className=' w-full border rounded-md px-3 py-2 text-xl focus:outline-none libre-baskerville-regular' {...register('idea',{required:true})} placeholder='Describe your idea....' rows={4}/>
              </div>
              
              {/** Purpose */}
              <div className=' w-full flex flex-col justify-center items-start '>
                  <label className='text-2xl libre-baskerville-bold text-white'>Purpose to work on idea</label>
                  <div>
                     {['Hackathon', 'Resume building', 'Learning', 'Research', 'Other'].map((item) => (
                         <label key={item} className="block text-white libre-baskerville-bold">
                          <input
                          type="radio"
                          value={item}
                          {...register('purpose', { required: true })}
                          className="mr-2"
                          />
                          {item}
                          </label>    
                     ))}
                  </div>
              </div>

              {/** Skill level */}
               <div className=' w-full flex justify-start items-center gap-9'>
                   <label className='text-2xl libre-baskerville-bold text-white'>Skill level</label>
                   <select className='rounded-md p-2 focus:outline-none'  {...register('skillLevel', { required: true })} >
                        <option value="">-- Select Skill Level --</option>
                        <option value="No knowledge">No knowledge</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                   </select>
               </div>

               {/* * Programming Languages
               <div>
                   <label>Skill level</label>
                   <div>
                      {['JavaScript', 'Python', 'Java', 'C++', 'C#','Go', 'Rust', 'PHP', 'Ruby', 'TypeScript', 'Kotlin', 'Swift'].map((lang) => (
                     <label key={lang} className="block">
                      <input type="checkbox" value={lang} {...register('languages')}  /> {lang}</label>
                     ))}
                   </div>
               </div> */}

               {/** Submit Button */}
               <button type='submit' className='text-xl w-1/3 h-11 rounded-md px-2 bg-white libre-baskerville-bold hover:bg-gray-400 transition-all ease-in-out duration-300'>Evaluate Idea</button>
        </form>
    </div>
  )
}

export default Playground