import React from 'react'
import {  FaLightbulb, FaTimes } from 'react-icons/fa';
import ReactStars from 'react-stars';

const EvaluationOutput = ({ output, setIsLoading, setResponse , error, setError }) => {

    const handleClose = ()=>{
        setIsLoading(false);
        setResponse({});
        setError(false);
        
    }


  return (
  error ? (
          <div className={` w-[30%]  relative bg-white flex flex-col justify-center items-center gap-2 py-4 px-12 rounded-md shadow-md space-y-4 opacity-0 ${output ? "opacity-100 transition-opacity duration-700 ease-linear" : ""}` }>
         {/** Close button */}
        <span className='absolute right-6 top-2'><button className=' size-8 font-bold text-xl text-red-600  rounded-full border-none ' onClick={handleClose} >
          <FaTimes className='text-2xl'/>
        </button></span>
        
         <div className='w-full h-16  rounded-lg flex justify-center items-center'>
          <p className=' text-center text-xl libre-baskerville-bold'>Internal Server Erorr</p>
         </div>
    </div>
 ) 
  : (  output?.score != null ? (
      <div className={` w-[90%]  h-[90%] relative bg-white grid grid-cols-2 grid-rows-3 grid-flow-row-dense gap-8 py-16 px-12 rounded-md shadow-md space-y-4 opacity-0 overflow-y-scroll ${output ? "opacity-100 transition-opacity duration-700 ease-linear" : ""}` }>
        <div className='w-full absolute mt-5 h-9 flex justify-center gap-2'>
             <span className='self-center'><FaLightbulb className='text-5xl '/></span>
            <h2 className="text-3xl font-bold text-gray-800 libre-baskerville-bold "> Idea Evaluation</h2>
        </div>

        {/** Close button */}
        <span className='absolute right-2 top-2'><button className=' size-8 font-bold text-xl text-red-600  rounded-full border-none ' onClick={handleClose} >
          <FaTimes className='text-2xl'/>
        </button></span>


        <div className=' h-fit bg-gray-100 p-4 rounded-md shadow-md shadow-gray-200'>
          <h3 className="text-xl font-bold text-gray-800 libre-baskerville-bold">Does it solve a real problem or is it just minimal?</h3>
          <p className='libre-baskerville-regular'>{output.realWorldImpact}</p>
        </div>

        <div className=' h-fit bg-gray-100 p-4 rounded-md shadow-md shadow-gray-200'>
          <h3 className="text-xl font-bold text-gray-800 libre-baskerville-bold">Is it good for their resume?</h3>
          <p className='libre-baskerville-regular'>{output.resumeValue}</p>
        </div>

        {
         output.technicalSuggestions && (
        <div className=' h-fit bg-gray-100 p-4 rounded-md shadow-md shadow-gray-200'>
          <h3 className="text-xl font-bold text-gray-800 libre-baskerville-bold">How could this be built or approached technically?</h3>
          <p className='libre-baskerville-regular'>{output.technicalSuggestions}</p>
        </div>
         )
       }

        <div className=' h-fit bg-gray-100 p-4 rounded-md shadow-md shadow-gray-200'>
          <h3 className="text-xl font-bold text-gray-800 libre-baskerville-bold">Project Score</h3>
           <p className='libre-baskerville-regular'>{output.score}/10</p>
           <ReactStars
           count={10}                    // 10 stars
           value={output.score}          // score out of 10
           size={24}
           half={true}
           edit={false}                  // read-only
           color2={"#facc15"}   // Tailwind's yellow-400
           />
        </div>

        <div className=' h-fit bg-gray-100 p-4 rounded-md shadow-md shadow-gray-200'>
          <h3 className="text-xl font-bold text-gray-800 libre-baskerville-bold">- Is this a good project to work on?</h3>
          <p className='libre-baskerville-regular'>{output.summary}</p>
        </div>

        <div className=' h-fit bg-gray-100 p-4 rounded-md shadow-md shadow-gray-200'>
          <h3 className="text-xl font-bold text-gray-800 libre-baskerville-bold">Minimal Suggestion</h3>
          <p className='libre-baskerville-regular'>{output.motivation}</p>
        </div>
      </div>
    ) :
    (   <div className={` w-3/5  relative bg-white flex flex-col justify-center items-center gap-2 py-4 px-12 rounded-md shadow-md space-y-4 opacity-0 ${output ? "opacity-100 transition-opacity duration-700 ease-linear" : ""}` }>
         {/** Close button */}
        <span className='absolute right-6 top-2'><button className=' size-8 font-bold text-xl text-red-600  rounded-full border-none ' onClick={handleClose} >
          <FaTimes className='text-2xl'/>
        </button></span>
        
         <div className='w-full h-16  rounded-lg flex justify-center items-center'>
          <p className=' text-center text-xl libre-baskerville-bold'>{output.ans}</p>
         </div>
    </div>)
  )
);
};


export default EvaluationOutput