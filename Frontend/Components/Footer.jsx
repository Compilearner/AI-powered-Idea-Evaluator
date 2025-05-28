import { FaCopyright } from "react-icons/fa"


const Footer = () => {
const year = new Date().getFullYear();
console.log(year);

  return (
    <footer className="w-full h-10 p-2 bg-black">
        <div className="flex justify-center items-center gap-3">
            <div className="flex justify-center items-center gap-2"> 
               <p className="text-lg  text-white libre-baskerville-regular">Copyright</p>
               <span className="text-white flex justify-center items-center gap-2">
                <FaCopyright className="self-center"/>
                <p className="text-lg  text-white libre-baskerville-regular">{year},</p>
                </span>
            </div>
            <p className="text-lg  text-white libre-baskerville-regular"> 
            All rights reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer