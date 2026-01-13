import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/empty.jpg";
import getCreatorCourse from "../../customHooks/getCreatorCourse";
import { setCreatorCourseData } from "../../redux/courseSlice";
import { getCurrentCourseApi } from "../../services/api";

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)
  
  const { creatorCourseData } = useSelector((state) => state.course);

     useEffect(() => {
           const creatorCourses = async () => {
             try {
               const result = await getCurrentCourseApi()
               console.log("courses",result.data)
               dispatch(setCreatorCourseData(result.data))
               
             }
             catch (error) {
               console.log(error)
             }
           }
           creatorCourses()
        },[userData])
  
 

  return (
    <div className="p-4 sm:p-6 w-full min-h-screen bg-gradient-to-b from-indigo-100 to-purple-50">
      {/* Header with Back + Title + Create */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-gray-700 text-xl sm:text-2xl hover:text-black transition"
          >
            <FaArrowLeft className="text-black cursor-pointer hover:text-gray-700" />
          </button>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            📚 All Courses
          </h1>
        </div>
        <button
          onClick={() => navigate("/createcourses")}
          className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-800  hover:from-purple-600 hover:to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 cursor-pointer hover:shadow-2xl transition-all duration-300 text-sm sm:text-base"
        >
          + Create Course
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {creatorCourseData && creatorCourseData.length > 0 ? (
          creatorCourseData.map((course, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Course Image */}
             {/* Course Image */}
<div className="relative w-full aspect-video overflow-hidden rounded-xl">
  <img
    src={course?.thumbnail || img}
    alt={course?.title}
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
  />
</div>


              {/* Course Content */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-1 truncate">
                  {course.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                  {course.description || "No description available."}
                </p>

                {/* Price, Status & Action */}
                <div className="flex flex-wrap justify-between items-center mt-auto gap-2">
                  <span className="text-sm sm:text-lg font-semibold text-indigo-600">
                    {course?.price ? `₹${course.price}` : "Free"}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      course.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                  <button className="ml-auto px-3 sm:px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-800  hover:from-purple-600 hover:to-indigo-500 text-white text-xs sm:text-sm rounded-lg shadow hover:scale-105 hover:shadow-md transition cursor-pointer"
                 onClick={() => navigate(`/editcourse/${course?._id}`)}
>
                    Action
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center text-sm sm:text-base">
            No courses found. Create one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Courses;
