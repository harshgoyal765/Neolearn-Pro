import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCoursesDataApi } from "../services/api";
import { setCourseData } from "../redux/courseSlice";

const usePublishedCourse = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const result = await getCoursesDataApi();
        console.log("published course",result.data)
        dispatch(setCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    getCourseData();
  }, [dispatch]);
};

export default usePublishedCourse;
