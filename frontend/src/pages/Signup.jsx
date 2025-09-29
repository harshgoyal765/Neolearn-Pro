import React, { useState } from "react";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import google from "../assets/google.jpg";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { signupUser ,googleSignupUser } from "../services/api"; 
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
 

const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await signupUser(name, email, password, role);
      dispatch(setUserData(result.data));
      setLoading(false);
      toast.success("Signup successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

 
const googleSignup = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    let user = response.user;
    let name = user.displayName;
    let email = user.email;

    // Use api.js function
    const result = await googleSignupUser(name, email, role);

    dispatch(setUserData(result.data));
    navigate("/");
    toast.success("Signup successful");
  } catch (error) {
    toast.error(error.response?.data?.message || "Signup failed");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form
        className="flex w-[800px] bg-white rounded-2xl overflow-hidden shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-1">Let’s get started</h2>
          <p className="text-gray-500 mb-6">Create your account</p>

          {/* Name */}
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#030d46]"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          {/* Email */}
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#030d46]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          {/* Password */}
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative mb-4">
            <input
              type={show ? "text" : "password"}
              placeholder="••••••"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#030d46]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {show ? <IoEye size={20} /> : <IoEyeOutline size={20} />}
            </button>
          </div>

          {/* Role Buttons */}
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`px-4 py-2 rounded-md border ${
                role === "student" ? "bg-[#030d46] text-white" : "bg-white text-gray-700"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("educator")}
              className={`px-4 py-2 rounded-md border ${
                role === "educator" ? "bg-[#030d46] text-white" : "bg-white text-gray-700"
              }`}
            >
              Educator
            </button>
          </div>

          {/* Sign Up Button */}
          <button
            type="button"
            className="w-full py-3 bg-[#030d46] text-white rounded-md mb-4 hover:bg-blue-900 disabled:opacity-50"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
          </button>

          {/* Already have an account */}
          <p className="text-sm text-gray-600 text-center mb-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-black font-medium cursor-pointer hover:underline hover:text-red-900"
            >
              Login here
            </span>
          </p>

          {/* Divider */}
          <div className="flex items-center mb-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-2 text-gray-400 text-sm">Or continue</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Button */}
          <button className="w-full py-3 border rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 hover:text-red-900 cursor-pointer" onClick={googleSignup}>
            <img src={google} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-[#030d46] text-white">
          <img src={logo} alt="Logo" className="w-20 h-20 mb-4 rounded-full" />
          <p className="text-lg tracking-wide">NEOLEARN PRO</p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
