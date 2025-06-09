import Card from "./Card"

const cardDetails = [
  {
    title: "Skill & Purpose based testing",
    description: "Feedback based on your experience level and the purpose of your idea—whether you're building for your resume, a hackathon, or academic research.",
    src: "/Images/purpose.jpg",
    alt:"purpose labeling with bulb",
  },
  {
    title: "Ideas Scoring System",
    description: "Get a instant score for your idea across key metrics like uniqueness, impact, and skill.",
    src: "/Images/evaluatie-score.png",
    alt:"Evaluation Score meter",
  },
  {
    title: "Ideas Store",
    description: "Capture and organize your project ideas in one place. Easily save, and revisit them whenever inspiration strikes.",
    src: "/Images/store.jpg",
    alt:"Notes of idea in book",
  }
];

const CardsSection = () => {
  return (
    <section className=" relative bg-black">
    <h2 className="text-3xl md:text-5xl text-white px-4 py-2 text-center libre-baskerville-bold mb-12 md:mb-16">
      IDEA-TEST-BUILD
    </h2>
  
    <div className="py-10 md:py-20 mb-10 md:mb-16 flex flex-col justify-center items-center gap-16 md:gap-36">
      {cardDetails.map((item, index) => (
        <div
          key={index}
          className={` px-4 sm:px-6 md:px-0} `}>
          <Card item={item} index={index} />
        </div>
      ))}
    </div>
  </section>
  
  )
}

export default CardsSection