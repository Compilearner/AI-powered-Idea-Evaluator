import Card from "./Card"

const cardDetails = [
  {
    title: "Skill & Purpose based testing",
    description: "Feedback based on your experience level and the purpose of your idea—whether you're building for your resume, a hackathon, or academic research.",
    src: "/Images/purpose.jpg",
    alt:"purpose labeling with bulb",
  },
  {
    title: "Idea Scoring System",
    description: "Get a instant score for your idea across key metrics like uniqueness, impact, and skill.",
    src: "/Images/evaluatie-score.png",
    alt:"Evaluation Score meter",
  },
  {
    title: "Idea Store",
    description: "Capture and organize your project ideas in one place. Easily save, and revisit them whenever inspiration strikes.",
    src: "/Images/store.jpg",
    alt:"Notes of idea in book",
  }
];

const CardsSection = () => {
  return (
  <section className=" pt-[1rem] relative bg-black">
     {/* 🎨 Decorative Background Circles */}
     <div className="absolute inset-0 -z-10">
        <div className="absolute w-60 h-60 bg-black rounded-full opacity-20 blur-3xl top-20 left-10"></div>
        <div className="absolute w-80 h-80 bg-black rounded-full opacity-20 blur-3xl top-[30%] right-10"></div>
        <div className="absolute w-52 h-52 bg-yellow-300 rounded-full opacity-20 blur-3xl bottom-0 right-[25%]"></div>
        <div className="absolute w-72 h-72 bg-yellow-400 rounded-full opacity-20 blur-3xl top-[60%] left-[45%]"></div>

        <div className="absolute w-60 h-60 bg-black rounded-full opacity-20 blur-3xl top-20 left-60"></div>
        <div className="absolute w-80 h-80 bg-yellow-300 rounded-full opacity-20 blur-3xl top-[30%] right-30"></div>
        <div className="absolute w-52 h-52 bg-black rounded-full opacity-20 blur-3xl bottom-0 right-[55%]"></div>
        <div className="absolute w-72 h-72 bg-black rounded-full opacity-20 blur-3xl top-[60%] left-[85%]"></div>
      </div>


      <h2 className="text-5xl text-white p-5 text-center libre-baskerville-bold  mb-16 bg-black">IDEA-TEST-BUILD</h2>
       <div className="py-20 mb-16 flex flex-col justify-center items-center gap-36 ">
      {
        cardDetails.map((item, index) => {
          return (
            <div   className={`${ index === 1 ? 'mr-[-10rem] rounded-[3rem] text-white' : 'ml-[-10rem]'}`} key={index}>
              <Card item={item} index={index} />
            </div>
          )
        })
      }
    </div>
  </section>  
  )
}

export default CardsSection