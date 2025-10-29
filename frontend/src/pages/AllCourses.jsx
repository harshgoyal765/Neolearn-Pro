import React, { useEffect, useState, useRef } from "react";
import { FaStar, FaArrowLeft, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ai from "../assets/SearchAi.png";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";

import { setUserData } from "../redux/userSlice";
import { logoutUser } from "../services/api"; // ✅ Make sure this exists

const categories = [
  "App Development",
  "AI/ML",
  "AI Tools",
  "Data Science",
  "Data Analytics",
  "Ethical Hacking",
  "UI/UX Designing",
  "Web Development",
  "Programming",
  "Others",
];

const AllCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.course.courseData);

  const [category, setCategory] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      dispatch(setUserData(null));
      toast.success(result?.data?.message || "Logout successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((c) => c !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    if (!Array.isArray(courseData)) return;

    let courseCopy = [...courseData];
    if (category.length > 0) {
      courseCopy = courseCopy.filter((c) =>
        category.some(
          (cat) => cat.toLowerCase() === c.category?.toLowerCase()
        )
      );
    }
    setFilteredCourses(courseCopy);
  }, [courseData, category]);

  // Sidebar close on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        window.innerWidth < 1024
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">

      {/* ✅ Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 text-white bg-gray-900 p-2 rounded-md lg:hidden"
        onClick={() => setSidebarOpen((prev) => !prev)}
        
      >
        <FaBars />
      </button>

      {/* ✅ Sidebar */}
      <aside
        ref={sidebarRef}
        className={` h-screen lg:h-screen
          fixed top-0 left-0 z-40  w-64 bg-gray-900 text-white shadow-lg transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          overflow-y-auto
        `}
      >
        <div className="p-6 h-full">
          {/* <div className="flex items-center space-x-2 cursor-pointer mb-4" onClick={() => navigate("/")}>
            <img src={logo} alt="Company Logo" className="w-20 h-20 bg-gray-800 rounded-full" />
          </div> */}

          <h2 className="text-2xl flex items-center font-bold mb-6 border-b border-gray-800 pb-2">
            <FaArrowLeft
              className="mr-2 cursor-pointer hover:text-purple-400 transition"
              onClick={() => navigate("/")}
            />
            Filter by Category
          </h2>

          <form onSubmit={(e) => e.preventDefault()}>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 mb-4 rounded-lg bg-gray-800 text-gray-200">
              Search with AI
              <img src={ai} className="w-[25px] h-[25px] rounded-full" alt="AI" />
            </button>

            <ul className="space-y-3">
              {categories.map((cat, idx) => (
                <li
                  key={idx}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    checked={category.includes(cat)}
                    onChange={toggleCategory}
                    className="accent-purple-500 w-4 h-4 cursor-pointer rounded-md"
                  />
                  <span className="text-sm font-medium">{cat}</span>
                </li>
              ))}
            </ul>
          </form>
        </div>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-6 bg-gradient-to-b from-indigo-100 to-purple-50">
        {/* Header */}
        <div className="flex justify-end gap-4 mb-6">
          <button
            className="px-4 py-2 bg-blue-950 cursor-pointer hover:bg-red-500 text-white rounded-lg"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          <button
            className="px-4 py-2 bg-blue-950 cursor-pointer hover:bg-red-500 text-white rounded-lg"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {Array.isArray(filteredCourses) && filteredCourses.length > 0 ? (
            filteredCourses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg hover:shadow-blue-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform"
              >
                <div className="w-full" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.category}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-gray-800">₹{course.price}</span>
                    <span className="flex items-center text-yellow-500">
                      <FaStar className="mr-1" /> {course.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No courses available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllCourses;
