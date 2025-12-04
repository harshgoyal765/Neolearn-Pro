import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong, FaPlay } from "react-icons/fa6";

function MyEnrolledCourses() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  // console.log(userData);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-6 py-12 relative flex flex-col items-center">
      
      {/* Back Button */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-6 left-8 flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer transition-all duration-200"
      >
        <FaArrowLeftLong className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:block">Back</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12 text-center drop-shadow-sm">
        My Enrolled Courses
      </h1>

      {/* No Courses */}
      {userData?.enrolledCourses?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No courses"
            className="w-32 h-32 opacity-70 mb-6"
          />
          <p className="text-gray-600 text-lg">
            You haven’t enrolled in any courses yet.
          </p>
        </div>
      ) : (
        <div className="grid place-items-center gap-10 w-full max-w-[1300px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {userData.enrolledCourses.map((course, index) => (
            <div
              key={course._id}
              className="w-[290px] bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl"
              style={{
                animation: `fadeIn 0.5s ease forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-500 mb-1 capitalize">
                  {course.category}
                </p>
                <p className="text-sm text-gray-600 mb-4 capitalize">
                  {course.level}
                </p>

                <button
                  onClick={() => navigate(`/viewlecture/${course._id}`)}
                  className="w-full py-2.5 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg font-medium text-sm shadow-md hover:from-gray-700 hover:to-gray-900 transition-all duration-200"
                >
                  <FaPlay className="text-xs" /> Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default MyEnrolledCourses;
