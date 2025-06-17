import React from 'react'
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../Store/authStore';
import { toast } from 'react-hot-toast';




const Feedback = () => {
  const { register, handleSubmit, reset } = useForm();
  const { feed } = useAuthStore((state) => state);
 


  const onSubmit = async (data) => {
    try {
      const res = await feed(data);
      console.log(res);

      if (res.success) {
        reset({
          main: "",
          suggestion: "",
        })

        /** Time for showing  */
        setTimeout(() => {
          toast.success(res.message);
        }, 2000);

      } else {
        /** Time for showing  */
        setTimeout(() => {
          toast.error(res.message);;
        }, 2000);
      }

    } catch (err) {
      console.log(err);
    }
  }



  return (

    <div id='feedback' className='h-[60vh] min500:h-[90vh] md:h-screen flex flex-col justify-center items-center gap-10  xl:gap-16 py-3 relative'>
      <h2 className='libre-baskerville-bold  text-lg sm:text-2xl md:text-4xl text-white text-center p-4 bg-black w-screen'>GIVE US YOUR VALUABLE FEEDBACK</h2>
    
        <div className=' w-full sm:w-9/12 md:w-8/12 bg-transparent h-[35vh] rounded-lg outline-1   '>
          <form onSubmit={handleSubmit(onSubmit)} className=' p-6  flex justify-center gap-6 flex-col w-full '>

            <div className='w-full p-2 flex justify-center items-center'>
              <textarea className='w-full p-2 libre-baskerville-bold rounded-md text-base sm:text-lg bg-transparent shadow-md border-black border-[.4rem]' {...register('main', { required: true })} required placeholder='Is it helpful?, Please write your thougths here....' rows={3} />
            </div>
            <div className='w-full flex justify-center items-center'>
              <button type='submit' className='border-none px-4 py-1 w-36 bg-green-700 shadow-md text-white libre-baskerville-bold rounded-md text-base sm:text-lg md:text-xl'>Submit</button>
            </div>
          </form>
        </div>
     
    </div>
  ) 
}

export default Feedback