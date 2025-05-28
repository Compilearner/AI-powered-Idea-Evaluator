import Card from "./Card"

const cardDetails = [
  {
    title: "Skill & Purpose based testing",
    description: "Feedback based on your experience level and the purpose of your idea—whether you're building for a startup, a hackathon, or academic research.",
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
  <section className=" pt-[1rem] relative">
      <h2 className="text-5xl text-white p-5 text-center libre-baskerville-bold  mb-16 bg-black">IDEA-TEST-BUILD</h2>
       <div className="py-20 mb-16 flex flex-col justify-center items-center gap-40 ">
      {
        cardDetails.map((item, index) => {
          return (
            <div className={`${index===1 ? 'mr-[-10rem] bg-black  rounded-[3rem] text-white' : 'ml-[-10rem]'}  `} key={index}>
              <Card item={item} />
            </div>
          )
        })
      }
    </div>
  </section>  
  )
}

export default CardsSection