import Navbar from "../components/Navbar";
import home1 from "../assets/homeimage.png";
import home2 from "../assets/analytics.webp";
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import Logos from "../components/Logos";
import ExploreCourses from "../components/ExploreCourses";
import CardPage from "../components/CardPage";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="">
     

<section className="pb-36 px-10 bg-gradient-to-b from-indigo-100 to-purple-50 pt-20 ">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-7xl font-bold leading-tight text-blue-800 mb-4">
              NeoLearn Pro<br /> Learning Platform
            </h1>
            <p className="text-gray-600 mb-6">
              Combined data through integration, analytical decision from the data warehouse. Data collection stored through Hadoop Models. Faster ways to access Big Data.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
        <button
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg
          bg-gradient-to-r from-indigo-600 to-purple-800 shadow-md hover:from-purple-600 hover:to-indigo-500 text-white text-[16px] lg:text-[18px] font-medium
          cursor-pointer transition duration-300 "
          onClick={() => navigate("/allcourses")}
        >
          View All Courses
          <SiViaplay className="w-5 h-5" />
        </button>

        <button
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
          bg-gradient-to-r from-indigo-600 to-purple-800 shadow-md hover:from-purple-600 hover:to-indigo-500 text-white text-[16px] lg:text-[18px] font-medium
          cursor-pointer transition duration-300 "
                onClick={()=>navigate('/search')}
        >
          Search With AI
          <img
            src={ai}
            alt="AI"
            className="hidden lg:block w-8 h-8 rounded-full"
          />
          <img
            src={ai1}
            alt="AI"
            className="block lg:hidden w-8 h-8 rounded-full"
          />
        </button>
      </div>
          </div>
          <div className="flex-1">
            <img
              src={home1}
              alt="Hero Illustration"
              className="w-full max-w-lg mx-auto h-auto object-contain filter mix-blend-multiply"
            />
          </div>
        </div>
      </section>
      <section className="pb-16 px-10 bg-gradient-to-t from-indigo-200 to-purple-50 ">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1">
            <img
              src={home2}
              alt="Data Analysis"
              className="w-full max-w-lg mx-auto "
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl text-blue-900 font-semibold mb-4">Analysis We Provide</h2>
            <p className="text-gray-600 mb-6">
              Expectation of obtaining an abstraction information of the data to derive business insights. Our tools examine the competition from the bottom up, providing a dashboard to visualize key performance indicators.
            </p>
            
          </div>
        </div>
      </section>

      <Logos />
      <ExploreCourses />
      <CardPage />
      
    </div>
  );
};

export default Home;
