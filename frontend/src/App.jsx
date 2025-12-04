import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPwd from './pages/ForgetPwd'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import CreateCourses from './pages/Educator/CreateCourses'
import { useLocation } from 'react-router-dom';
import getCreatorCourse from './customHooks/getCreatorCourse'
import useGetCurrentUser from './customHooks/getCurrentUser'
import EditCourse from './pages/Educator/EditCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import AllCourses from './pages/AllCourses'
import CreateLecture from './pages/Educator/CreateLecture'
import EditLecture from './pages/Educator/EditLecture'
import ViewCourse from './pages/ViewCourse'
import ScrollToTop from './components/ScrollToTop'
import ViewLecture from './pages/ViewLecture'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import MyEnrolledCourses from './pages/MyEnrolledCourses'
import SearchWithAi from './pages/SearchWithAi'
import getAllReviews from './customHooks/getAllReviews'


const App = () => {
  useGetCurrentUser()
  getCreatorCourse()
  getPublishedCourse()
  getAllReviews()
  const { userData } = useSelector((state) => state.user);
   const location = useLocation();
  return (
    
    <>
      <ToastContainer />
      <ScrollToTop />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={!userData ? <Signup /> 
        :<Navigate to={"/"}/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={userData ? <Profile /> :
          <Navigate to={"/signup"} />} />
         <Route path="/forgot-password" element={userData ? <ForgetPwd/>:
          <Navigate to={"/Signup"} />}/>
         <Route path="/edit-profile" element={userData ? <EditProfile/>:
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
          <Navigate to={"/Signup"} />} />
        
          <Route path="/createlecture/:courseId" element={userData?.role === "educator" ? <CreateLecture/>:
          <Navigate to={"/Signup"} />} />
         <Route path="/editlecture/:courseId/:lectureId" element={userData?.role === "educator" ? <EditLecture/>:
          <Navigate to={"/Signup"} />} />
        
         <Route path="/viewcourse/:courseId" element={userData? <ViewCourse/>:
          <Navigate to={"/Signup"} />} />
          <Route path="/viewLecture/:courseId" element={userData? <ViewLecture/>:
          <Navigate to={"/Signup"} />} />
        <Route path="/mycourses" element={userData? <MyEnrolledCourses/>:
          <Navigate to={"/Signup"} />} />
        <Route path="/search" element={userData? <SearchWithAi/>:
          <Navigate to={"/Signup"} />} />
        
      </Routes>
      <Footer/>
    </>
  )
}

export default App
