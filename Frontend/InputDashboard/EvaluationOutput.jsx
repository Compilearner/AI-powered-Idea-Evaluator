import { FaTimes } from 'react-icons/fa';


const EvaluationOutput = ({ output, setResponse , setIsLoading, error, setError }) => {

    const handleClose = ()=>{
        setIsLoading(false);
        setResponse({});
        setError(false);
        
    }


  return error ? (
          <div className={` w-[30%]  relative bg-white flex flex-col justify-center items-center gap-2 py-4 px-12 rounded-md shadow-md space-y-4 opacity-0 ${error ? "opacity-100 transition-opacity duration-700 ease-linear" : ""}` }>
         {/** Close button */}
        <span className='absolute right-6 top-2'><button className=' size-8 font-bold text-xl text-red-600  rounded-full border-none ' onClick={handleClose} >
          <FaTimes className='text-2xl'/>
        </button></span>
        
         <div className='w-full h-16  rounded-lg flex justify-center items-center'>
          <p className=' text-center text-xl libre-baskerville-bold'>Internal Server Error</p>
         </div>
    </div>
 ) 
  :  output.ExperienceLevel != null ? (
      <div className={` w-[90%]  max-h-fit relative bg-gray-200 py-8 px-12 rounded-md shadow-md space-y-4 opacity-0  ${output.ExperienceLevel ? "opacity-100 transition-opacity duration-700 ease-linear" : ""}` }>
        <h1 className='libre-baskerville-regular text-[2rem] text-black text-center bg-white'>Here is your Response</h1>

        {/** Close button */}
        <span className='absolute right-2 top-2'><button className=' size-8 font-bold text-xl text-red-600  rounded-full border-none ' onClick={handleClose} >
          <FaTimes className='text-2xl'/>
        </button></span>
        
        {/**Experiance based */}
        <div className=''>
            <h2 className='libre-baskerville-regular text-[1.4rem] text-black'>{output.ExperienceLevel.title}</h2>
            <p className='roboto-normal text-gray-700 text-[1.1rem]'><strong>Rating: </strong>{output.ExperienceLevel.rating}</p>
            <p className='roboto-normal text-gray-700 text-[1.1rem]'><strong>Evaluation: </strong>{output.ExperienceLevel.feedback}</p>
        </div>

        <div className=''>
            <h2 className='libre-baskerville-regular text-[1.4rem] text-black'>{output.Purpose.title}</h2>
            <p className='roboto-normal text-gray-700 text-[1.1rem]'><strong>Rating: </strong>{output.Purpose.rating}</p>
            <p className='roboto-normal text-gray-700 text-[1.1rem]'><strong>Evaluation: </strong>{output.Purpose.feedback}</p>
        </div>

        {/** Recommendation Container */}
        <div className=''>
          <h2 className='libre-baskerville-regular text-[1.4rem] text-black'>Some Recommendations:</h2>
            {output.Recommendations.steps.map((step, index)=>{
              return (
                <p key={index}>{step}</p>
              )
            })}
        </div>

         {/** Feedback Container */}
        <div className=''>
          <h2 className='libre-baskerville-regular text-[1.4rem] text-black'>Final Evaluation:</h2>
            <p>{output.OverallFeedback.feedback}</p>
        </div>

       
      </div>
    ) :(   <div className={` w-3/5  relative bg-white flex flex-col justify-center items-center gap-2 py-4 px-12 rounded-md shadow-md space-y-4 opacity-0 ${output ? "opacity-100 transition-opacity duration-700 ease-linear" : ""}` }>
         {/** Close button */}
        <span className='absolute right-6 top-2'><button className=' size-8 font-bold text-xl text-red-600  rounded-full border-none ' onClick={handleClose} >
          <FaTimes className='text-2xl'/>
        </button></span>
        
         <div className='w-full h-16  rounded-lg flex justify-center items-center'>
          <p className=' text-center text-xl text-red-700 libre-baskerville-bold'>{output.OverallFeedback.feedback}</p>
         </div>
    </div>
    ) 
};


export default EvaluationOutput