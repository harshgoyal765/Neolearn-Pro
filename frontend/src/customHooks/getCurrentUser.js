import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUserApi } from "../services/api";
import { setUserData } from "../redux/userSlice"; // adjust path if needed

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getCurrentUserApi();
        dispatch(setUserData(result.data));
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(setUser(null));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
