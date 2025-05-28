import CardsSection from "./CardsSection"
import Footer from "./Footer"
import { Link } from "react-router-dom"
import { useAuthStore } from "../Store/authStore"
import Feedback from "./Feedback";



const Home = () => {
const {user} = useAuthStore((state)=>state);

  return (
  
    <main className="relative" >
        <div className="w-full h-[77vh] flex justify-around items-center my-[2rem] pr-4">
          <div className="flex flex-col w-[45%] pl-5">
              <h1 className="libre-baskerville-bold text-[2.3rem] font-bold">Get Feedback on Your Ideas in Minutes!</h1>
              <p className="libre-baskerville-bold text-xl ">Not sure about your own idea?</p>
              <h2 className="libre-baskerville-regular text-xl mb-6">Let AI help you evaluate your project ideas based on your skills, goals.</h2>
              <Link to={ user ? "/playground" : "login-signup"}>
                   <button className="libre-baskerville-bold text-xl bg-black text-white px-5 w-1/3 h-12 rounded-lg ">
                   {user ? "Let's Test" : "Get Started"}
                   </button>
              </Link>
          </div>
          <div className="w-[33%] h-auto rounded-t-full rounded-b-full p-6 mr-12 ">
              <img src={"/Images/idea_01.jpg"} alt="Person thinking an Idea" />
          </div>
        </div>
        <CardsSection/>
        <Feedback/>
        <Footer/>
    </main>
    
  );
}

export default Home