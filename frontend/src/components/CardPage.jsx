import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

function CardPage() {
  const { courseData } = useSelector((state) => state.course);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    console.log("👉 courseData from redux:", courseData);
    if (Array.isArray(courseData) && courseData.length > 0) {
     setPopularCourses(courseData);
    }
  }, [courseData]);

  return (
    <div className="relative flex items-center justify-center flex-col bg-gradient-to-t from-indigo-400 to-purple-50">
      {/* Section Title */}
      <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]">
        Our Popular Courses
      </h1>

      {/* Section Subtitle */}
      <span className="lg:w-[50%] md:w-[80%] text-[25px] w-100% text-center mt-[30px] mb-[30px] px-[20px]">
        Explore top-rated courses designed to boost your skills, enhance careers,
        and unlock opportunities in tech, AI, business, and beyond.
      </span>

      {/* Wrapper for Course Cards */}
      <div className="w-[100%] min-h-[10vh] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]">
        {popularCourses?.map((course, index) => (
          <Card
            key={index}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course._id}
          />
        ))}
      </div>
    </div>
  );
}

export default CardPage;
