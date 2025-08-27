import React from 'react'
import { Navigate, Route , Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPwd from './pages/ForgetPwd'
import Editprofile from './pages/Editprofile'
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import CreateCourses from './pages/Educator/CreateCourses'
import getCreatorCourse from './customHooks/getCreatorCourse'
import useGetCurrentUser from './customHooks/getCurrentUser'
import EditCourse from './pages/Educator/EditCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import AllCourses from './pages/AllCourses'


const App = () => {
  useGetCurrentUser()
  getCreatorCourse()
  getPublishedCourse()
  const { userData } = useSelector((state) => state.user);
  return (
    
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={!userData ? <Signup /> 
        :<Navigate to={"/"}/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={userData ? <Profile /> :
          <Navigate to={"/signup"} />} />
         <Route path="/forgot-password" element={userData ? <ForgetPwd/>:
          <Navigate to={"/Signup"} />}/>
         <Route path="/edit-profile" element={userData ? <Editprofile/>:
          <Navigate to={"/Signup"} />} />
         <Route path="/allcourses" element={userData ? <AllCourses/>:
          <Navigate to={"/Signup"} />} />
          <Route path="/dashboard" element={userData?.role === "educator" ? <Dashboard/>:
          <Navigate to={"/Signup"} />} />
        <Route path="/courses" element={userData?.role === "educator" ? <Courses/>:
          <Navigate to={"/Signup"} />} />
        <Route path="/createcourses" element={userData?.role === "educator" ? <CreateCourses/>:
          <Navigate to={"/Signup"} />} />
         <Route path="/editcourse/:courseId" element={userData?.role === "educator" ? <EditCourse/>:
          <Navigate to={"/Signup"} />}/>
      </Routes>
    </>
  )
}

export default App
