// import React from 'react'

// const Card = ({item}) => {
//   return (
// <div className="relative w-[80vw] h-[50vh]  border-gray-500 border rounded-[3rem] flex items-center p-10 gap-24 overflow-hidden shadow-lg " >
//     <div className='w-2/5 h-4/5'>
//         <img src={item.src} alt={item.alt} className='object-cover w-full h-full ' />
//     </div>
//     <div className=' w-2/4 flex flex-col gap-10' >
//          <h2 className='roboto-semibold text-4xl '>{item.title}</h2>
//          <p className='libre-baskerville-regular text-gray-500 text-lg'>{item.description}</p>
//     </div>
// </div>
//   )
// }

// export default Card

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Card = ({ item, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const fromX = index === 1 ? window.innerWidth : -window.innerWidth;

    gsap.fromTo(
      cardRef.current,
      {
        x: fromX,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'restart none none none', // animate on every scroll-in
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative w-[80vw] h-[50vh] rounded-[3rem] flex items-center p-10 gap-24 overflow-hidden border border-gray-100 "
    >
      <div className="w-2/5 h-4/5">
        <img src={item.src} alt={item.alt} className="object-cover w-full h-full" />
      </div>
      <div className="w-2/4 flex flex-col gap-10">
        <h2 className="roboto-semibold text-white text-4xl">{item.title}</h2>
        <p className="libre-baskerville-regular text-gray-500 text-lg">{item.description}</p>
      </div>
    </div>
  );
};

export default Card;






