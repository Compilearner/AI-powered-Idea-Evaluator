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
        fetchIdeas(user.userId);
        console.log(ideas);
   },[fetchIdeas]);

  return (
    <>
     {/** Idea History Container */}
        <div className="w-2/3   flex- flex-col justify-center items-center  border bg-white  rounded-xl p-6">
        <h2 className="libre-baskerville-bold  text-2xl text-center  mb-4">Ideas History</h2>
           {
             ideas.slice(0,visibleCount).map((idea, idx)=>{
              return (
                <div key={idea._id} className="rounded-lg p-3 mt-4 text-center relative w-full bg-gray-200 shadow shadow-gray-300">
                  { /** Delete Button */}
                  <button className='absolute top-2 -right-3 border-none w-10  ' onClick={()=>handleDeleteIdea(idea._id)}><FaTimes className='text-lg text-red-600'/></button>
                    

                   <span className='absolute top-1 left-2 libre-baskerville-bold text-green-700'>({idx+1})</span> 
                  <p className="libre-baskerville-bold  text-lg p-4"> {idea.description}</p>
                </div>
              )
             }) 
           }
           {visibleCount < ideas.length && (
            <div className='flex justify-center items-center mt-6 '>
             <button onClick={handleShowMore} className=' p-3 rounded-md bg-black libre-baskerville-bold text-white text-xl '>Show more</button>
            </div>
           )}
        </div>
    </>  
  )
}
