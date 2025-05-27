import Card from "./Card"

const cardDetails = [
  {
    title: "Idea Scoring System",
    description: "Get a detailed score for your idea across key metrics like uniqueness, feasibility, impact, and skill.",
    src: "/Images/evaluatie-score.png",
    alt:"Evaluation Score meter",
  },
  {
    title: "Skill & Purpose Aware Testing",
    description: "Feedback based on your experience level and the purpose of your idea—whether you're building for a startup, a hackathon, or academic research.",
    src: "/Images/skill-level.jpg",
    alt:"Skill levels",
  },
  {
    title: "Instant Suggestions",
    description: "Receive AI-generated suggestions to refine and start with your idea.",
    src: "/Images/suggestion.jpg",
    alt:"Suggestion picture",
  }
];

const CardsSection = () => {
  return (
  <section className="h-[120vh] bg-black pt-[1rem] relative">
      <h2 className="text-5xl text-white text-center libre-baskerville-bold sticky top-4 mb-16">IDEA-TEST-BUILD</h2>
       <div className="pt-[5rem] flex justify-center items-center gap-8 ">
      {
        cardDetails.map((item, index) => {
          return (
            <div className={index === 1 ? "mt-[9rem]" : ""} key={index}>
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