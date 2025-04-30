import React from 'react'

const Card = ({item}) => {
  return (
<div className="relative w-[25vw] h-[55vh] bg-white rounded-[3rem] flex flex-col items-center p-4 space-y-4 overflow-hidden">
  {/* Gradient Overlay */}
   <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent z-0 rounded-b-[3rem]" />

  {/* Main Content */}
   <img 
    src={item.src} 
    alt={item.alt}
    className="w-[95%] h-[10rem] object-cover border border-gray-200 rounded-xl  relative z-10" 
  />
  
   <div className="text-center space-y-2 relative z-10">
      <h1 className="text-black text-2xl font-semibold libre-baskerville-regular">{item.title}</h1>
      <p className="text-gray-600 text-base font-medium libre-baskerville-regular">{item.description}</p>
  </div>
</div>
  )
}

export default Card