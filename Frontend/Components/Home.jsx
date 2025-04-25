import CardsSection from "./CardsSection"
import Footer from "./Footer"
import Navbar from "./Navbar"
import UserButton from "./UserButton"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <main>
        <Navbar/>
        <div className="w-full flex justify-around items-center my-[2rem] pr-4">
          <div className="flex flex-col w-[45%] pl-5">
              <h1 className="libre-baskerville-bold text-[2.3rem] font-bold">Get Feedback on Your Ideas in Minutes!</h1>
              <p className="libre-baskerville-bold text-xl ">Not sure about your own idea?</p>
              <h2 className="libre-baskerville-regular text-xl mb-6">Let AI help you evaluate your project ideas based on your skills, goals.</h2>
              <Link to={"/login-signup"}>
                   <button className="libre-baskerville-bold text-xl bg-black text-white px-5 w-1/3 h-12 rounded-lg ">Get Started</button>
              </Link>
          </div>
          <div className="w-[33%] h-auto rounded-t-full rounded-b-full p-6 border border-gray-400">
              <img src={"/Images/idea_01.jpg"} alt="Person thinking an Idea" />
          </div>
        </div>
        <CardsSection/>
        <Footer/>
    </main>
  )
}

export default Home