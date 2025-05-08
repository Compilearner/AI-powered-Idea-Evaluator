import React from 'react'
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../Store/authStore';
import {toast} from 'react-hot-toast';
import { FaCommentDots } from 'react-icons/fa';

const Feedback = () => {
const { register, handleSubmit, reset } = useForm();
const {feed} = useAuthStore((state)=>state);

const onSubmit = async(data)=>{
     try{
      const res = await feed(data);
      console.log(res);

      if(res.success){
        reset({
            main: "",
            suggestion:"",
        })

        /** Time for showing  */
           setTimeout(()=>{
              toast.success(res.message);
           }, 2000);
        
      }else{
         /** Time for showing  */
          setTimeout(()=>{
           toast.error(res.message);;
         }, 2000);
      }

     }catch(err){
        console.log(err);
     }
}


  return (
    <div className='bg-black h-screen flex flex-col gap-16 justify-center items-center'>
      <h2 className='text-white text-3xl p-3 bg-green-600 w-full text-center libre-baskerville-bold'>Give us your valuable feedback</h2>
        <div className=' w-[45vw] bg-transparent h-[55vh] rounded-lg outline-1 outline-white border'>
            <form onSubmit={handleSubmit(onSubmit)} className=' p-6  flex justify-center gap-6 flex-col w-full'>
              {/* <span><FaCommentDots className='text-white text-2xl'/></span> */}

              {/* <div className=' h-14 p-2 flex justify-center items-center'>
                <input className='w-full h-full p-2 bg-gray-200 libre-baskerville-bold' type='email' {...register('email', {required:true})} required/>
              </div> */}
              <div className=' p-2 flex justify-center items-center'>
                <textarea className='w-full bg-transparent  p-2 libre-baskerville-bold border text-white' {...register('main', {required:true})} required placeholder='Is it helpful?, Please write your thougths here....' rows={3}/>
              </div>
              <div className=' p-2 flex  flex-col  gap-3 justify-center items-center'>
               <label className='text-white text-left libre-baskerville-bold text-xl w-full'>(Optional)</label>
               <textarea className='w-full bg-transparent p-2 libre-baskerville-bold border text-white' {...register('suggestion')}  placeholder='Any suggestions to make it better....' rows={3}/>
              </div>
              <div className='w-full flex justify-center items-center'>
                <button type='submit' className='border-none px-4 py-1 w-36 bg-green-600 text-white libre-baskerville-bold rounded-md text-xl'>Submit</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Feedback