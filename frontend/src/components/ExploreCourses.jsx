import React from "react";
import { SiViaplay } from "react-icons/si";
import { FaHackerrank } from "react-icons/fa6";
import { MdAppShortcut } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ExploreCourses = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] min-h-[60vh] flex flex-col lg:flex-row items-center justify-center gap-8 px-[30px] py-12 bg-cream-100">
      {/* left/top div */}
      <div className="w-[100%] lg:w-[350px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]">
        <span className="text-[40px] font-bold text-gray-900 leading-tight">
          Explore
        </span>
        <span className="text-[40px] font-bold text-indigo-700 leading-tight">
          Our Courses
        </span>
        <p className="text-[17px] text-gray-600 mt-4 leading-relaxed">
          Discover industry-focused courses designed to build real-world skills. Learn from structured content, hands-on projects, and expert guidance to accelerate your tech career.
        </p>
        <button className="flex items-center cursor-pointer gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-800 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-500 transition-all duration-500 font-medium"onClick={()=>navigate("allcourses")}>
          Explore Courses
          <SiViaplay className="w-[24px] h-[24px] animate-pulse" />
        </button>
      </div>

      {/* right/bottom div */}
      <div className="w-[100%] lg:w-[65%] grid grid-cols-2 md:grid-cols-3 gap-6 ">
        
        {/* Course cards */}
        {[
          { icon: "💻", title: "Web Development", desc: "Build modern websites & applications" },
          { icon: "📱", title: "Mobile Development", desc: "Create apps for iOS & Android" },
          { icon: <MdAppShortcut />, title: "App Development", desc: "Develop scalable mobile apps" },
          { icon: <FaHackerrank />, title: "Ethical Hacking", desc: "Learn cybersecurity & hacking" },
          { icon: "📊", title: "Data Science", desc: "Master data analysis & visualization" },
          { icon: "🤖", title: "AI & ML", desc: "Explore artificial intelligence" },
        ].map((course, i) => (
         <div
  key={i}
  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center
             border border-transparent hover:border-indigo-500  hover:scale-[1.05]
             transition-transform duration-300 ease-in-out cursor-pointer group hover:shadow-lg hover:shadow-blue-800 "
>
  <div className="text-5xl mb-4 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300">
    {course.icon}
  </div>
  <h3 className="font-semibold text-xl text-gray-800 group-hover:text-indigo-800 transition-colors duration-300">
    {course.title}
  </h3>
  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
    {course.desc}
  </p>
</div>

        ))}
      </div>
    </div>
  );
};

export default ExploreCourses;
