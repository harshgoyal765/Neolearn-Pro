import axios from "axios";
 

export const serverUrl = "https://neolearn-pro.onrender.com/api";

// Signup API
export const signupUser = async (name, email, password, role) => {
  return await axios.post(
    `${serverUrl}/api/auth/signup`,
    { name, email, password, role },
    { withCredentials: true }
  );
}; 
// New Google Signup
export const googleSignupUser = (name, email, role) =>
  axios.post(`${serverUrl}/auth/googleauth`, { name, email, role }, { withCredentials: true });

export const googleLoginUser = (name, email, role) =>
  axios.post(`${serverUrl}/auth/googleauth`, { name, email, role }, { withCredentials: true });

//login api
export const loginUser = async (email, password) => {
  return await axios.post(
    `${serverUrl}/auth/login`,
    { email, password },
    { withCredentials: true }
  );
};
export const logoutUser = async () => {
  return await axios.get(
    `${serverUrl}/auth/logout`,
     { withCredentials: true }
  );
};


// Get Current User API
export const getCurrentUserApi = async () => {
  return await axios.get(`${serverUrl}/user/getcurrentuser`, {
    withCredentials: true,
  });
};


// ✅ Send OTP
export const sendOtp = (email) =>
  axios.post(`${serverUrl}/auth/send-otp`, { email });

// ✅ Verify OTP
export const verifyOtp = (email, otp) =>
  axios.post(`${serverUrl}/auth/verify-otp`, { email, otp });

// ✅ Reset Password
export const resetPassword = (email, newPassword) =>
  axios.post(`${serverUrl}/auth/reset-Password`, { email, newPassword });

// Update Profile API
export const updateTheProfile = (formData) => {
  return axios.post(`${serverUrl}/user/profile`,
    formData,
    {
      withCredentials: true,
    } 
  );
}

export const createCourse = (title, category) =>{
  return axios.post(`${serverUrl}/course/create`, { title, category }, {  withCredentials: true }
  )
};
  

// Get Current course API
export const getCurrentCourseApi = async () => {
  return await axios.get(`${serverUrl}/course/getcreator`, {
    withCredentials: true,
  });
};

// Get course by ID
export const getCoursesByid = async (courseId) => {
  return await axios.get(`${serverUrl}/course/getcourse/${courseId}`, {
    withCredentials: true,
  });
};

// Update Course API
export const updateCourse = async (courseId, formData) => {
  return await axios.post(
    `${serverUrl}/course/editcourse/${courseId}`,
    formData,
    {
      withCredentials: true,
      
    }
  );
};


//remove course 
export const removedCourse = async (courseId) => {
return await axios.delete(
    `${serverUrl}/course/remove/${courseId}`,
    {
      withCredentials: true,
      },
  );
};


//getcourses data
export const getCoursesDataApi = async (courseId) => {
  return await axios.get(`${serverUrl}/course/getpublished`, {
    withCredentials: true,
  });
};

//add lecture
export const addLecture = (courseId,data) => {
  return axios.post(`${serverUrl}/course/createlecture/${courseId}`,data, {
    withCredentials: true,
  });
};

export const getLecture = (courseId) => {
  return axios.get(`${serverUrl}/course/courselecture/${courseId}`, {
    withCredentials: true,
  });
};

export const editLectureInfo = (lectureId , formData) => {
  return axios.post(`${serverUrl}/course/editlecture/${lectureId}`,formData, {
    withCredentials: true,
  });
};


export const removeLectureInfo = (lectureId) => {
  return axios.delete(`${serverUrl}/course/removelecture/${lectureId}`, {
    withCredentials: true,
  });
};


export const getCreatorInfo = (selectedCourse) => {
  return axios.post(`${serverUrl}/course/creator`, {
    userId: selectedCourse ? selectedCourse.creator : null
  }, {
    withCredentials: true,
  });
};
//razorpay order api
export const razorOrder = (userId,courseId) => {
  return axios.post(`${serverUrl}/order/razorpay-order`, {
    userId, courseId
  }, {
    withCredentials: true,
  });
};


export const razorOrderVerify = (response,courseId,userId) => {
  return axios.post(`${serverUrl}/order/verifypayment`, {
    ...response,courseId,userId
  }, {
    withCredentials: true,
  });
};


