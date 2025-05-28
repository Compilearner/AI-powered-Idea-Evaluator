import React from 'react'

const Card = ({item}) => {
  return (
<div className="relative w-[80vw] h-[50vh]  border-gray-500 border rounded-[3rem] flex items-center p-10 gap-24 overflow-hidden shadow-lg " >
    <div className='w-2/5 h-4/5'>
        <img src={item.src} alt={item.alt} className='object-cover w-full h-full ' />
    </div>
    <div className=' w-2/4 flex flex-col gap-10' >
         <h2 className='roboto-semibold text-4xl '>{item.title}</h2>
         <p className='libre-baskerville-regular text-gray-500 text-lg'>{item.description}</p>
    </div>
</div>
  )
}

export default Card