import React, { useState } from 'react'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import google from "../assets/google.jpg";
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { loginUser ,googleLoginUser } from "../services/api"; 
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from "../utils/firebase";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlelogin = async () => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      dispatch(setUserData(result.data));
      setLoading(false);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
    }
  }
  
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      let role = ""
  
      // Use api.js function
      const result = await googleLoginUser(name, email, role);
  
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("login successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
       <form
        className="flex w-[800px] bg-white rounded-2xl overflow-hidden shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
      <div className="flex w-[800px] bg-white rounded-2xl overflow-hidden shadow-lg">
        
        {/* Left Section - Login Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
          <p className="text-gray-500 mb-6">Login into your account</p>

          {/* Email */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#030d46]"
             onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          {/* Password */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative mb-2">
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

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-black font-medium hover:underline cursor-pointer  hover:text-red-800"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button className="w-full py-3 bg-[#030d46] text-white rounded-md mb-4 cursor-pointer hover:bg-blue-900"onClick={handlelogin} disabled={loading}>
           {loading ? <ClipLoader size={30} color='white'/> : "Login"}
          </button>

          {/* Redirect to Signup */}
          <p className="text-sm text-center text-gray-600 mb-4">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-black hover:text-red-500 cursor-pointer font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>

          {/* Divider */}
          <div className="flex items-center mb-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-2 text-gray-400 text-sm">Or continue</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Button */}
          <button className="w-full py-3 border rounded-md flex items-center justify-center gap-2 hover:text-red-800 hover:bg-gray-100  cursor-pointer" onClick={googleLogin}>
            <img src={google} alt="Google" className="w-5 h-5" />
            Login with Google
          </button>
        </div>

        {/* Right Section - Logo */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-[#030d46] text-white">
          <img src={logo} alt="Logo" className="w-20 h-20 mb-4 rounded-full" />
          <p className="text-lg tracking-wide">VIRTUAL COURSES</p>
        </div>
        </div>
        </form>
    </div>
  );
};

export default Login;
