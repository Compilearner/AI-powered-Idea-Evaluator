import CardsSection from "./CardsSection"
import Footer from "./Footer"
import { Link } from "react-router-dom"
import { useAuthStore } from "../Store/authStore"
import Feedback from "./Feedback";
import Navbar from "./Navbar";
import UserButton from "./UserButton";


const Home = () => {
   
const {user} = useAuthStore((state)=>state);


  return (
  
    <main className="relative" >
        <div className="w-full min-h-fit md:h-[80vh] max640:h-[80vh] flex flex-col-reverse justify-center md:flex-row md:justify-around items-center mt-2 mb-8  md:my-[2rem] px-6 lg:pr-4">
          <div className="flex flex-col max768:justify-center max768:items-center  w-full sm:w-3/4 md:w-2/3 lg:w-[45%] pl-5">
              <h1 className="libre-baskerville-bold hidden md:inline text-lg  sm:text-2xl md:text-3xl xl:text-[2.3rem] font-bold">Get Feedback on Your Ideas in Minutes!</h1>
              <p className="libre-baskerville-bold hidden md:inline text-base sm:text-lg md:text-xl xl:text-2xl ">Not sure about your own idea?</p>
              <h2 className="libre-baskerville-regular w-full text-base sm:text-lg md:text-xl xl:text-2xl mb-6 text-gray-500">Let AI help you evaluate your project ideas based on your skills, goals.</h2>
              <Link to={ user ? "/playground" : "login-signup"}>
                   <button className="libre-baskerville-bold  text-base md:text-lg lg:text-xl bg-black text-white px-6 w-full  md:w-1/2 rounded-md py-2">
                   {user ? "Let's Test": "Get Started"}
                   </button>
              </Link>
          </div>
          <div className="w-4/5  lg:w-[40%] xl:w-[33%] h-auto rounded-t-full rounded-b-full pt-12 sm:p-6 xl:mr-12 ">
              <img src={"/Images/idea_01.webp"} alt="Person thinking an Idea" className="object-cover w-full" />
          </div>
        </div>
        <CardsSection/>
        <Feedback/>
        <Footer/>
    </main>
    
  );
}

export default Home