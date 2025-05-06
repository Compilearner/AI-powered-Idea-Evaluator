import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../Store/authStore';

export const IdeasShow = () => {
const itemsShow = 3;

const {ideas, fetchIdeas, user} = useAuthStore((state)=>state);
const [visibleCount, setVisibleCount] = useState(itemsShow);

const handleShowMore = ()=>{
    setVisibleCount((prev)=> Math.min(prev+itemsShow, ideas.length));
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
                <div key={idea._id} className="rounded-lg p-4 mt-4 text-center relative w-full bg-gray-200 shadow shadow-gray-300">
                   <span className='absolute top-1 left-2 libre-baskerville-bold text-green-700'>({idx+1})</span> 
                  <p className="libre-baskerville-bold  text-lg"> {idea.description}</p>
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
