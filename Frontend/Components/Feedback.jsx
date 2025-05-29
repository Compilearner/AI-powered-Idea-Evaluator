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

    <div id='feedback' className=' h-[100vh] flex flex-col   gap-16 justify-between items-center py-[5rem] relative'>
      <h2 className='libre-baskerville-bold  text-4xl text-white text-center p-4 bg-black w-screen'>GIVE US YOUR VALUABLE FEEDBACK</h2>
      <div className='flex justify-center items-center gap-6  rounded-[3rem] shadow-xl border border-gray-500  px-4 '>
        <div className='w-2/5 h-[75%] '>
          <img src='/Images/feedback.png' alt='feedback box illustration' className='object-cover w-full h-full' />
        </div>
        <div className=' w-[45vw] bg-transparent h-[35vh] rounded-lg outline-1  '>
          <form onSubmit={handleSubmit(onSubmit)} className=' p-6  flex justify-center gap-6 flex-col w-full '>

            <div className=' p-2 flex justify-center items-center'>
              <textarea className='w-full bg-transparent  p-2 libre-baskerville-bold border rounded-md  bg-white shadow-md' {...register('main', { required: true })} required placeholder='Is it helpful?, Please write your thougths here....' rows={3} />
            </div>
            <div className='w-full flex justify-center items-center'>
              <button type='submit' className='border-none px-4 py-1 w-36 bg-green-700 shadow-md text-white libre-baskerville-bold rounded-md text-xl'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) 
}

export default Feedback