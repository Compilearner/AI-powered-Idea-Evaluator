import  { useEffect, useRef } from 'react';
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
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'restart none none none', // animate on every scroll-in
        },
      }
    );
  }, [index]);

  return (
<div
   ref={cardRef}
  className="relative w-[80vw] max-w-6xl tallest:h-[35vh] h-auto md:h-[50vh] rounded-3xl flex flex-col md:flex-row items-center p-6 md:p-10 gap-10 md:gap-24 overflow-hidden border border-gray-100">
  {/* Image Container */}
  <div className="w-full md:w-2/5 h-64 md:h-4/5">
    <img
      src={item.src}
      alt={item.alt}
      className="object-cover w-full h-full rounded-2xl"
      loading='lazy'
    />
  </div>

  {/* Text Container */}
  <div className="w-full md:w-2/4 flex flex-col gap-4 md:gap-10 text-center md:text-left">
    <h2 className="roboto-semibold text-white text-lg  sm:text-xl md:text-2xl">{item.title}</h2>
    <p className="libre-baskerville-regular text-gray-500 text-base md:text-lg">
      {item.description}
    </p>
  </div>
</div>
  );
};

export default Card;


