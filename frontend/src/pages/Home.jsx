import Navbar from "../components/Navbar";
import home from "../assets/home1.jpg";
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import Logos from "../components/Logos";
import ExploreCourses from "../components/ExploreCourses";
import CardPage from "../components/CardPage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />

      <img
        src={home}
        className="object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh] "
        alt=""
      />
      <span className="lg:text-[70px] md:text-[40px] text-[20px] absolute lg:top-[10%] top-[15%] w-full flex items-center justify-center text-white font-bold">
        Grow Your Skills to Advance
      </span>

      <span className="lg:text-[70px] md:text-[40px] text-[20px] absolute lg:top-[18%] top-[20%] w-full flex items-center justify-center text-white font-bold">
        Your Career Path
      </span>
      <div className="absolute w-full flex flex-wrap items-center justify-center gap-3 px-4
  top-[88%] sm:top-[82%] md:top-[67%] lg:top-[50%]">

  <button className="flex items-center justify-center gap-2 px-5 py-2 border-2 rounded-lg
    border-black lg:border-white text-black lg:text-white text-[10px] lg:text-[18px] font-light
    cursor-pointer transition-colors duration-300 hover:bg-gray-200 lg:hover:bg-transparent"
        onClick={()=>navigate('/allcourses')}>

    View All Courses
    <SiViaplay className="w-6 h-6 lg:w-8 lg:h-8 fill-current" />
  </button>

  <button className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg
    bg-black lg:bg-white text-white lg:text-black text-[10px] lg:text-[18px] font-light
    cursor-pointer transition-colors duration-300 hover:bg-gray-800 lg:hover:bg-gray-100"
        >

    Search With Ai
    <img
      src={ai}
      alt=""
      className="hidden lg:block w-8 h-8 rounded-full"
    />
    <img
      src={ai1}
      alt=""
      className="block lg:hidden w-9 h-9 rounded-full"
    />
  </button>
</div>

      <Logos />
      <ExploreCourses />
      <CardPage/>
    </div>
  );
};

export default Home;
