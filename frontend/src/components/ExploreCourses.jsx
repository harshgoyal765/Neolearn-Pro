import React from "react";
import { SiViaplay } from "react-icons/si";
import { FaHackerrank } from "react-icons/fa6";
import { MdAppShortcut } from "react-icons/md";

const ExploreCourses = () => {
  return (
    <div className="w-[100vw] min-h-[60vh] flex flex-col lg:flex-row items-center justify-center gap-8 px-[30px] py-12 bg-gradient-to-l from-indigo-50 to-green-200">
      {/* left/top div */}
      <div className="w-[100%] lg:w-[350px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]">
        <span className="text-[40px] font-bold text-gray-900 leading-tight">
          Explore
        </span>
        <span className="text-[40px] font-bold text-indigo-700 leading-tight">
          Our Courses
        </span>
        <p className="text-[17px] text-gray-600 mt-4 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Rem vel
          explicabo laboriosam accusantium egestila laudentium liberere magnum.
        </p>
        <button className="flex items-center cursor-pointer gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-500 transition-all duration-500 font-medium">
          Explore Courses
          <SiViaplay className="w-[24px] h-[24px] animate-pulse" />
        </button>
      </div>

      {/* right/bottom div */}
      <div className="w-[100%] lg:w-[65%] grid grid-cols-2 md:grid-cols-3 gap-6">
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
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-center items-center 
            hover:shadow-xl hover:scale-105 hover:border-indigo-400 hover:border 
            transition-all duration-300 cursor-pointer"
          >
            <div className="text-5xl mb-3 text-indigo-600">{course.icon}</div>
            <h3 className="font-semibold text-lg text-gray-800">{course.title}</h3>
            <p className="text-gray-600 text-sm text-center mt-2">{course.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCourses;
