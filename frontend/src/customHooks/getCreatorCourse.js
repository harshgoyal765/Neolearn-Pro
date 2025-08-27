import React, { useEffect } from 'react'
import { getCurrentCourseApi } from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSlice'

const getCreatorCourse = () => {
  const dispatch = useDispatch()
  const {userData}  = useSelector(state=>state.user)
  return (
    useEffect(() => {
      const creatorCourses = async () => {
        try {
          const result = await getCurrentCourseApi()
          console.log(result.data)
          dispatch(setCreatorCourseData(result.data))
          
        }
        catch (error) {
          console.log(error)
        }
      }
      creatorCourses()
   },[userData])
  )
}

export default getCreatorCourse
