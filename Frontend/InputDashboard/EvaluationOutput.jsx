import React from 'react'
import {  FaTimes } from 'react-icons/fa';
import ReactStars from 'react-stars';

const EvaluationOutput = ({ output, setIsLoading, setResponse }) => {

    const handleClose = ()=>{
        setIsLoading(false);
        setResponse({});
        
    }

  return (
    output.score ? (
      <div className={` w-3/5  relative bg-white flex flex-col justify-center items-center gap-2 py-4 px-12 rounded-md shadow-md space-y-4 opacity-0 ${output ? "opacity-100 transition-opacity duration-700 ease-linear" : ""}` }>
        <h2 className="text-2xl font-bold text-gray-800 libre-baskerville-bold ">🚀 Idea Evaluation</h2>

        {/** Close button */}
        <span className='absolute right-6 top-2'><button className=' size-8 font-bold text-xl text-red-600  rounded-full border-none ' onClick={handleClose} >
          <FaTimes className='text-2xl'/>
        </button></span>

       {
         output.techSuggestions && (
        <div className=' bg-gray-100 p-4 rounded-md shadow-md shadow-gray-200'>
          <h3 className="text-xl font-bold text-gray-800 libre-baskerville-bold">💻 Tech Suggestions</h3>
          <p className='libre-baskerville-regular'>{output.techSuggestions}</p>
        </div>
         )
       }

        <div className=' bg-gray-100 p-4 rounded-md shadow-md shadow-gray-200'>
          <h3 className="text-xl font-bold text-gray-800 libre-baskerville-bold">🌟 Uniqueness & Impact</h3>
          <p className='libre-baskerville-regular'>{output.uniquenessImpact}</p>
        </div>

        <div className=' bg-gray-100 p-4 rounded-md shadow-md shadow-gray-200'>
          <h3 className="text-xl font-bold text-gray-800 libre-baskerville-bold">📈 Evaluation Summary</h3>
          <p className='libre-baskerville-regular'>{output.evaluationSummary}</p>
        </div>

        <div className=' w-full bg-gray-100 p-4 rounded-md shadow-md shadow-gray-200'>
          <h3 className="text-xl font-bold text-gray-800 libre-baskerville-bold">⭐ Score</h3>
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

        <div className='w-full bg-gray-100 p-4 rounded-md shadow-md shadow-gray-200'>
          <h3 className="text-xl font-bold text-gray-800 libre-baskerville-bold">📝 Recommendation</h3>
          <p className='libre-baskerville-regular'>{output.recommendation}</p>
        </div>
      </div>
    ) :
    (   <div className={` w-3/5  relative bg-white flex flex-col justify-center items-center gap-2 py-4 px-12 rounded-md shadow-md space-y-4 opacity-0 ${output ? "opacity-100 transition-opacity duration-700 ease-linear" : ""}` }>
         {/** Close button */}
        <span className='absolute right-6 top-2'><button className=' size-8 font-bold text-xl text-red-600  rounded-full border-none ' onClick={handleClose} >
          <FaTimes className='text-2xl'/>
        </button></span>
        
         <div className='w-full h-16  rounded-lg flex justify-center items-center'>
          <p className=' text-center text-xl libre-baskerville-bold'>{output.evaluationSummary}</p>
         </div>
    </div>)
  );
};


export default EvaluationOutput