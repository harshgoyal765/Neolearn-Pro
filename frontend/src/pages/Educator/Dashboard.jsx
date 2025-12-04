import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  // Bar graph data
  const CourseProgressData =
    creatorCourseData?.map((course) => ({
      name: course.title?.slice(0, 10) + "...",
      lectures: course.lectures?.length || 0,
    })) || [];

  const EnrollData =
    creatorCourseData?.map((course) => ({
      name: course.title?.slice(0, 10) + "...",
      enrolled: course.enrolledStudents?.length || 0,
    })) || [];

  return (
    <div className="bg-gradient-to-b from-indigo-100 to-purple-50 min-h-screen p-4 sm:p-8 font-sans transition-all duration-300">

      {/* Header Section */}
      <header className="flex items-center mb-10">
        <button
          onClick={() => navigate("/")}
          className="text-gray-700 text-2xl hover:text-black transition"
        >
          <FaArrowLeftLong />
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6 flex-1 ml-4 flex flex-col sm:flex-row items-center justify-between hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-5">
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="User Avatar"
                className="w-20 h-20 rounded-full object-cover border-4 border-black shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-indigo-500 text-white flex items-center justify-center text-3xl font-bold border-4 border-black shadow-lg">
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                {userData?.name || "Guest User"} 👋
              </h1>
              <p className="text-gray-500 text-base mt-1">
                {userData?.role || ""}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate("/courses")}
              className="bg-[linear-gradient(to_right,_#030d46_100%,_#06eaea_0%)] text-white font-semibold py-3 px-6 rounded-full hover:text-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Create Course
            </button>
            <button className="bg-white text-gray-800 border-2 border-gray-300 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md">
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Course Progress Chart */}
       {/* Course Progress Chart */}
<div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl duration-300">
  <h2 className="text-xl font-semibold text-gray-800 mb-6 tracking-wide">
    Course Progress (Lectures)
  </h2>

  <ResponsiveContainer width="100%" height={320}>
    <BarChart data={CourseProgressData} barSize={85}>
      <CartesianGrid strokeDasharray="4 4" stroke="#d1d5db80" />

      <XAxis
        dataKey="name"
        tick={{ fill: "#030d46", fontSize: 12 }}
        axisLine={false}
        tickLine={false}
      />

      <YAxis
        tick={{ fill: "#030d46", fontSize: 12 }}
        axisLine={false}
        tickLine={false}
      />

      <Tooltip
        contentStyle={{
          background: "white",
          borderRadius: "12px",
          border: "1px solid #e5e7eb"
        }}
      />

      <Bar
        dataKey="lectures"
        radius={[12, 12, 0, 0]}
        fill="url(#colorLectures)"
      />

      {/* Gradient */}
      <defs>
        <linearGradient id="colorLectures" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#030d46" stopOpacity={1.9} />
          <stop offset="100%" stopColor="#06eaea" stopOpacity={1} />
        </linearGradient>
      </defs>
    </BarChart>
  </ResponsiveContainer>
</div>


{/* Student Enrollment Chart */}
<div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl duration-300">
  <h2 className="text-xl font-semibold text-gray-800 mb-6 tracking-wide">
    Student Enrollment
  </h2>

  <ResponsiveContainer width="100%" height={320}>
    <BarChart data={EnrollData} barSize={85}>
      <CartesianGrid strokeDasharray="4 4" stroke="#d1d5db80" />

      <XAxis
        dataKey="name"
        tick={{ fill: "#030d46", fontSize: 12 }}
        axisLine={false}
        tickLine={false}
      />

      <YAxis
        tick={{ fill: "#030d46", fontSize: 12 }}
        axisLine={false}
        tickLine={false}
      />

      <Tooltip
        contentStyle={{
          background: "white",
          borderRadius: "12px",
          border: "1px solid #e5e7eb"
        }}
      />

      <Bar
        dataKey="enrolled"
        radius={[12, 12, 0, 0]}
        fill="url(#colorEnroll)"
      />

      {/* Gradient */}
      <defs>
        <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#030d46" stopOpacity={1.9} />
          <stop offset="100%" stopColor="#06eaea" stopOpacity={1} />
        </linearGradient>
      </defs>
    </BarChart>
  </ResponsiveContainer>
</div>

      </div>
    </div>
  );
}

export default Dashboard;
