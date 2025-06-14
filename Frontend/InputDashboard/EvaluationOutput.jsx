import { FaTimes } from 'react-icons/fa';


const EvaluationOutput = ({ output, setResponse , setIsLoading, error, setError }) => {

    const handleClose = ()=>{
        setIsLoading(false);
        setResponse({});
        setError(false);
        
    }


  return error ? (
    <div className={`w-full sm:w-4/5 md:w-3/5 lg:w-[30%] relative bg-white flex flex-col justify-center items-center gap-2 py-4 px-4 sm:px-6 md:px-10 lg:px-12 rounded-md shadow-md space-y-4 opacity-0 ${error ? "opacity-100 transition-opacity duration-700 ease-linear" : ""}`}>
    {/* Close button */}
    <span className='absolute right-4 top-2'>
      <button className='size-8 font-bold text-base sm:text-lg md:text-xl text-red-600 rounded-full border-none' onClick={handleClose}>
        <FaTimes className='text-xl sm:text-2xl' />
      </button>
    </span>

    <div className='w-full h-16 rounded-lg flex justify-center items-center'>
      <p className='text-center text-base sm:text-lg md:text-xl libre-baskerville-bold'>Internal Server Error</p>
    </div>
  </div>
) : output.ExperienceLevel != null ? (
  <div className={`w-full sm:w-11/12 md:w-5/6 lg:w-[90%] max-h-fit relative bg-white py-10 px-4 sm:px-6 md:px-10 lg:px-12 rounded-md shadow-md shadow-gray-500 space-y-4 opacity-0 ${output.ExperienceLevel ? "opacity-100 transition-opacity duration-700 ease-linear" : ""}`}>
    {/* <h1 className='libre-baskerville-regular text-xl sm:text-xl md:text-2xl text-black text-center bg-white'>Here is your Response</h1> */}

    {/* Close button */}
    <span className='absolute right-2 top-2'>
      <button className='size-8 font-bold text-base sm:text-lg md:text-xl text-red-600 rounded-full border-none' onClick={handleClose}>
        <FaTimes className='text-xl sm:text-2xl' />
      </button>
    </span>

    {/* Experience Level */}
    <div>
      <h2 className='libre-baskerville-regular text-lg sm:text-xl md:text-2xl text-black'>{output.ExperienceLevel.title}</h2>
      <p className='roboto-normal text-blue-700 text-sm sm:text-base md:text-lg'><strong>Rating: </strong>{output.ExperienceLevel.rating}</p>
      <p className='roboto-normal text-gray-700 text-sm sm:text-base md:text-lg'><strong>Evaluation: </strong>{output.ExperienceLevel.feedback}</p>
    </div>

    {/* Purpose */}
    <div>
      <h2 className='libre-baskerville-regular text-lg sm:text-xl md:text-2xl text-black'>{output.Purpose.title}</h2>
      <p className='roboto-normal text-blue-700 text-sm sm:text-base md:text-lg'><strong>Rating: </strong>{output.Purpose.rating}</p>
      <p className='roboto-normal text-gray-700 text-sm sm:text-base md:text-lg'><strong>Evaluation: </strong>{output.Purpose.feedback}</p>
    </div>

    {/* Recommendations */}
    <div>
      <h2 className='libre-baskerville-regular text-lg sm:text-xl md:text-2xl text-black'>Some Recommendations:</h2>
      {output.Recommendations.steps.map((step, index) => (
        <p key={index} className='text-sm sm:text-base md:text-lg'>{step}</p>
      ))}
    </div>

    {/* Final Evaluation */}
    <div>
      <h2 className='libre-baskerville-bold text-lg sm:text-xl md:text-2xl text-gray-700'>Final Evaluation:</h2>
      <p className='text-sm text-blue-700 sm:text-base md:text-lg'>{output.OverallFeedback.feedback}</p>
    </div>
  </div>
) : (
  <div className={`w-full min-h-fit sm:w-4/5  relative bg-white flex flex-col justify-center items-center gap-2 py-4 px-4 sm:px-6 md:px-10 lg:px-12 rounded-md shadow-md space-y-4 opacity-0 ${output ? "opacity-100 transition-opacity duration-700 ease-linear" : ""}`}>
    {/* Close button */}
    <span className='absolute right-0 md:right-1 lg:right-3 top-2'>
      <button className='size-8 font-bold text-base sm:text-lg md:text-xl text-red-600 rounded-full border-none' onClick={handleClose}>
        <FaTimes className='text-xl sm:text-2xl' />
      </button>
    </span>

    <div className='w-full h-16 rounded-lg flex justify-center items-center'>
      <p className='text-center text-sm sm:text-base md:text-lg text-red-700 libre-baskerville-bold'>{output.OverallFeedback.feedback}</p>
    </div>
  </div>
    ) 
};


export default EvaluationOutput