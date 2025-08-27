// src/Dashboard.js
import React from "react";
import { FaDollarSign, FaUserFriends, FaStar } from "react-icons/fa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user || {}); //
  const navigate = useNavigate();

  const courseProgressData = [60, 40, 90, 75, 50, 85];
  const studentEnrollmentData = [80, 55, 95, 70, 45, 80];

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans transition-all duration-300 animate-fade-in">
      {/* Header Section */}
      <header className="flex items-center mb-10">
        <button className="text-gray-700 text-2xl hover:text-black transition">
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => navigate("/")}
            className="cursor-pointer text-black text-2xl"
          />
        </button>
        <div className="bg-white rounded-3xl shadow-xl p-6 flex-1 ml-4 flex flex-col sm:flex-row items-center justify-between transition-transform duration-300 hover:shadow-2xl">
          <div className="flex items-center space-x-5">
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="User Avatar"
                className="w-20 h-20 rounded-full object-cover border-4 border-black shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-indigo-500 text-white flex items-center justify-center text-3xl font-bold border-4 border-black shadow-lg">
                {userData?.name?.slice(0, 1).toUpperCase() }
             
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                {userData?.name || "Guest User"}{" "}
                <span
                  role="img"
                  aria-label="waving hand"
                  className="ml-2 text-xl"
                >
                  👋
                </span>
              </h1>
              <p className="text-gray-500 text-base mt-1">
                {userData?.role || ""}
                
              </p>
            </div>
          </div>
          <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="bg-black text-white font-semibold py-3 px-6 rounded-full cursor-pointer hover:text-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"onClick={()=>navigate("/courses")}>
              Create Course
            </button>
            <button className="bg-white text-gray-800 border-2 border-gray-300 font-semibold cursor-pointer py-3 px-6 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md">
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-start transition-all hover:scale-105 duration-300 hover:shadow-2xl">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Course Earnings
          </h2>
          <div className="flex items-center text-4xl font-extrabold text-gray-900">
            <FaDollarSign className="mr-3 text-teal-500" />
            <span>$1,000,000</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-start transition-all hover:scale-105 duration-300 hover:shadow-2xl">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Total Headcount
          </h2>
          <div className="flex items-center text-4xl font-extrabold text-gray-900">
            <FaUserFriends className="mr-3 text-orange-500" />
            <span>1,000,000</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-start transition-all hover:scale-105 duration-300 hover:shadow-2xl">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Course Ratings
          </h2>
          <div className="flex items-center text-4xl font-extrabold text-gray-900">
            <FaStar className="text-yellow-400 mr-3" />
            <span>4.5</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Progress Chart */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">
            Course Progress
          </h2>
          <div className="flex items-end h-64 border-b-2 border-gray-300 pb-2 space-x-4">
            {courseProgressData.map((height, index) => (
              <div
                key={index}
                className="relative flex-1 rounded-t-lg bg-indigo-500 shadow-md transition-all duration-500 hover:bg-indigo-600"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-medium text-gray-500 mt-2">
            {["A", "B", "C", "D", "E", "F"].map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
        </div>

        {/* Student Enrollment Chart */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">
            Student Enrollment
          </h2>
          <div className="flex items-end h-64 border-b-2 border-gray-300 pb-2 space-x-4">
            {studentEnrollmentData.map((height, index) => (
              <div
                key={index}
                className="relative flex-1 rounded-t-lg bg-teal-500 shadow-md transition-all duration-500 hover:bg-teal-600"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-medium text-gray-500 mt-2">
            {["A", "B", "C", "D", "E", "F"].map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
