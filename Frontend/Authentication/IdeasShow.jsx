import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../Store/authStore';
import { FaTimes } from 'react-icons/fa';
import {toast} from 'react-hot-toast';



export const IdeasShow = () => {
const itemsShow = 3;

const {ideas, fetchIdeas, user, deleteIdea} = useAuthStore((state)=>state);
const [visibleCount, setVisibleCount] = useState(itemsShow);

const handleShowMore = ()=>{
    setVisibleCount((prev)=> Math.min(prev+itemsShow, ideas.length));
}

const handleDeleteIdea = async(ideaId)=>{
  try{
    const res = await deleteIdea(ideaId);
    if(res.success){
         toast.success(res.message);
    
    }else{
      toast.error(res.message);
    }


  }catch(err){
    console.log(err);
  }

}

useEffect(()=>{
        fetchIdeas(user.userId || user._id);
        
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[fetchIdeas]);

  return (
    <>
     {/** Idea History Container */}
        <div className="w-full h-fit  flex flex-col justify-center items-center     rounded-xl py-6 ">
        <h2 className="roboto-semibold text-3xl text-center text-white p-4 w-full mb-4">IDEAS HISTORY</h2>
           { ideas.length > 0 &&
             ideas.slice(0,visibleCount).map((idea, idx)=>{
              return (
                <div key={idea._id} className=" w-3/4  p-3 mt-4 text-center relative border-b   shadow ">
                  { /** Delete Button */}
                  <button className='absolute top-2 -right-3 border-none w-10  ' onClick={()=>handleDeleteIdea(idea._id)}><FaTimes className='text-lg text-red-600'/></button>
                    

                   <span className='absolute top-1 left-2 libre-baskerville-bold text-green-700'>({idx+1})</span> 
                  <p className="roboto-normal text-white text-lg p-4"> {idea.description}</p>
                </div>
              )
             }) 
           }
           {visibleCount < ideas.length && (
            <div className='flex justify-center items-center mt-6 '>
             <button onClick={handleShowMore} className=' p-3 rounded-md bg-green-600 libre-baskerville-bold text-white text-xl '>Show more</button>
            </div>
           )}

           { /** No Ideas Exist */}
           {
              !ideas.length && (
                <p className='libre-baskerville-regular  text-xl text-center text-red-600'>No Ideas Yet.....</p>
              )
           }
        </div>
    </>  
  )
}
