import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoPersonCircleOutline, IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { logoutUser } from "../services/api";
import logo from "../assets/logo.jpg";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();
  const sidebarRef = useRef();

  // Handle logout
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

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpenSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-black text-white px-6 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50">
        {/* Left: Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Link to="/" className="flex items-center gap-3">
            {/* Logo */}
            <img
              src={logo}
              alt="Company Logo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-md object-cover border-2 border-indigo-600"
            />

            {/* Brand Text */}
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Neo
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                learn
              </span>
            </span>
          </Link>
        </div>

        {/* Right: Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Dashboard (Educator only) */}
          {userData?.role === "educator" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
            >
              Dashboard
            </button>
          )}

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold cursor-pointer hover:ring-2 hover:ring-indigo-500 transition"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              {userData?.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  alt={userData.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                userData?.name?.slice(0, 1).toUpperCase() || (
                  <IoPersonCircleOutline className="text-3xl text-white" />
                )
              )}
            </div>

            {openDropdown && (
              <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl overflow-hidden z-50 text-gray-800 border border-gray-200">
                <ul className="flex flex-col">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/profile");
                      setOpenDropdown(false);
                    }}
                  >
                    My Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/mycourses");
                      setOpenDropdown(false);
                    }}
                  >
                    My Courses
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Logout / Login */}
          {userData ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Right: Mobile Hamburger */}
        <div className="md:hidden">
          <GiHamburgerMenu
            className="text-3xl cursor-pointer hover:text-indigo-400 transition"
            onClick={() => setOpenSidebar(true)}
          />
        </div>
      </nav>

      {/* Sidebar (Mobile only) */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white shadow-lg transform ${
          openSidebar ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Menu</h2>
          <IoClose
            className="text-2xl cursor-pointer hover:text-red-500"
            onClick={() => setOpenSidebar(false)}
          />
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col p-4 space-y-4 text-lg font-medium">
          <span
            className="cursor-pointer hover:text-indigo-400"
            onClick={() => {
              navigate("/");
              setOpenSidebar(false);
            }}
          >
            Home
          </span>
          <span
            className="cursor-pointer hover:text-indigo-400"
            onClick={() => {
              navigate("/profile");
              setOpenSidebar(false);
            }}
          >
            My Profile
          </span>
          <span
            className="cursor-pointer hover:text-indigo-400"
            onClick={() => {
              navigate("/mycourses");
              setOpenSidebar(false);
            }}
          >
            My Courses
          </span>
          {userData ? (
            <span
              className="cursor-pointer hover:text-red-400"
              onClick={() => {
                handleLogout();
                setOpenSidebar(false);
              }}
            >
              Logout
            </span>
          ) : (
            <span
              className="cursor-pointer hover:text-green-400"
              onClick={() => {
                navigate("/login");
                setOpenSidebar(false);
              }}
            >
              Login
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
