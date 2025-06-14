import { useState} from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../Store/authStore';
import EvaluationOutput from './EvaluationOutput';
import { FaHandPaper } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const Playground = () => {
const navigate = useNavigate();
const { register, handleSubmit, reset } = useForm();
const [isLoadingSpin, setIsLoadingSpin] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [response, setResponse] = useState({});
const [error, setError] = useState(false);

const {user, token, playground } = useAuthStore((state) => state);


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
    <section>
    <section className='py-4 px-4 sm:px-6 md:px-10 mb-12 mt-28'>
      <div className='rounded-lg min-h-fit py-8 px-8 bg-white flex flex-col justify-center gap-20'>
  
        <div className='flex flex-col justify-center gap-32'>
  
          {/* Upper Container */}
          <div className='flex flex-col justify-center items-center gap-2 bg-transparent w-full sm:w-4/5 md:w-3/5 mx-auto rounded-lg p-4'>
            <div className='flex text-gray-600 justify-center gap-2'>
              <span className='self-center'><FaHandPaper className='text-2xl sm:text-3xl text-black' /></span>
              <h2 className='libre-baskerville-bold text-[1.2rem] sm:text-2xl  md:text-4xl text-gray-600'>Hi, Creative Thinker</h2>
            </div>
          </div>
  
          {/* Input */}
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center gap-6'>
  
            {/* Input Idea */}
            <div className='w-full sm:w-4/5 md:w-3/5  rounded-md'>
              <textarea
                className='w-full rounded-md px-3 py-2 text-base sm:text-lg md:text-xl bg-gray-300 focus:outline-none libre-baskerville-regular'
                {...register('idea', { required: true })}
                placeholder='For example: I want to build a gym app from scratch'
                rows={4}
                required
              />
            </div>
  
            {/* Select Options */}
            <div className='w-full sm:w-4/5 md:w-3/5 flex flex-col sm:flex-row justify-between items-center gap-4'>
  
              {/* Purpose */}
              <div className='w-full sm:w-1/2 flex flex-col justify-center'>
                <select
                  className='rounded-md p-3 sm:p-4 text-sm sm:text-base focus:outline-none bg-gray-300'
                  {...register('purpose', { required: true })}
                  required
                >
                  <option value="" className='text-gray-300'>-- Select Purpose to work on idea --</option>
                  <option value="Learning">Learning</option>
                  <option value="Hackathon Project">Hackathon Project</option>
                  <option value="Resume Building">Resume Building</option>
                  <option value="Research">Research</option>
                  <option value="Other">Other</option>
                </select>
              </div>
  
              {/* Skill Level */}
              <div className='w-full sm:w-1/2 flex justify-start items-center'>
                <select
                  className='rounded-md p-3 sm:p-4 text-sm sm:text-base focus:outline-none w-full bg-gray-300'
                  {...register('skillLevel', { required: true })}
                  required
                >
                  <option value="">-- Select Skill Level --</option>
                  <option value="No knowledge">No knowledge</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
  
            {/* Submit Buttons */}
            <div className='w-full sm:w-4/5 md:w-3/5 flex flex-col sm:flex-row justify-center items-center gap-4'>
              <button
                onClick={handleReset}
                type='button'
                className='text-base sm:text-lg w-full sm:w-2/5 md:w-[35%] h-10 rounded-md px-2 bg-black text-white libre-baskerville-bold hover:bg-gray-600 transition-all ease-in-out duration-300'
              >
                Reset Input
              </button>
              <button
                type='submit'
                className={`text-base sm:text-lg w-full sm:w-2/5 md:w-[35%] h-10 rounded-md px-2 bg-green-700 text-white libre-baskerville-bold hover:bg-gray-400 transition-all ease-in-out duration-300 ${isLoading || response ? "disabled:cursor-not-allowed" : ""}`}
              >
                Evaluate Idea
              </button>
            </div>
  
          </form>
        </div>
  
        {/* Response Container */}
        {isLoading && (
          <div className='bg-transparent rounded-md flex justify-center items-center py-12 px-2'>
            {isLoadingSpin ? (
              <div className='flex justify-center items-center gap-2'>
                 <div className="animate-spin h-8 w-8 border-4 border-gray-500 border-t-transparent rounded-full"></div>
                 <h2 className='roboto-normal text-xl'>Evaluating...</h2>
              </div>
            ) : (
              <EvaluationOutput
                output={response}
                setIsLoading={setIsLoading}
                setResponse={setResponse}
                error={error}
                setError={setError}
              />
            )}
          </div>
        )}
      </div>
    </section>
  </section>
  
  ): (navigate('/login-signup'))
}

export default Playground