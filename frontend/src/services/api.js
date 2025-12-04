import axios from "axios";
 

export const serverUrl = "https://neolearn-pro.onrender.com";
// export const serverUrl = "http://localhost:8000";

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
  axios.post(`${serverUrl}/api/auth/googleauth`, { name, email, role }, { withCredentials: true });

export const googleLoginUser = (name, email, role) =>
  axios.post(`${serverUrl}/api/auth/googleauth`, { name, email, role }, { withCredentials: true });

//login api
export const loginUser = async (email, password) => {
  return await axios.post(
    `${serverUrl}/api/auth/login`,
    { email, password },
    { withCredentials: true }
  );
};
export const logoutUser = async () => {
  return await axios.get(
    `${serverUrl}/api/auth/logout`,
     { withCredentials: true }
  );
};


// Get Current User API
export const getCurrentUserApi = async () => {
  return await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
    withCredentials: true,
  });
};


// ✅ Send OTP
export const sendOtp = (email) =>
  axios.post(`${serverUrl}/api/auth/send-otp`, { email });

// ✅ Verify OTP
export const verifyOtp = (email, otp) =>
  axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp });

// ✅ Reset Password
export const resetPassword = (email, newPassword) =>
  axios.post(`${serverUrl}/api/auth/reset-Password`, { email, newPassword });

// Update Profile API
export const updateTheProfile = (formData) => {
  return axios.post(`${serverUrl}/api/user/profile`,
    formData,
    {
      withCredentials: true,
    } 
  );
}

export const createCourse = (title, category) =>{
  return axios.post(`${serverUrl}/api/course/create`, { title, category }, {  withCredentials: true }
  )
};
  

// Get Current course API
export const getCurrentCourseApi = async () => {
  return await axios.get(`${serverUrl}/api/course/getcreator`, {
    withCredentials: true,
  });
};

// Get course by ID
export const getCoursesByid = async (courseId) => {
  return await axios.get(`${serverUrl}/api/course/getcourse/${courseId}`, {
    withCredentials: true,
  });
};

// Update Course API
export const updateCourse = async (courseId, formData) => {
  return await axios.post(
    `${serverUrl}/api/course/editcourse/${courseId}`,
    formData,
    {
      withCredentials: true,
      
    }
  );
};


//remove course 
export const removedCourse = async (courseId) => {
return await axios.delete(
    `${serverUrl}/api/course/remove/${courseId}`,
    {
      withCredentials: true,
      },
  );
};


//getcourses data
export const getCoursesDataApi = async (courseId) => {
  return await axios.get(`${serverUrl}/api/course/getpublished`, {
    withCredentials: true,
  });
};

//add lecture
export const addLecture = (courseId,data) => {
  return axios.post(`${serverUrl}/api/course/createlecture/${courseId}`,data, {
    withCredentials: true,
  });
};

export const getLecture = (courseId) => {
  return axios.get(`${serverUrl}/api/course/courselecture/${courseId}`, {
    withCredentials: true,
  });
};

export const editLectureInfo = (lectureId , formData) => {
  return axios.post(`${serverUrl}/api/course/editlecture/${lectureId}`,formData, {
    withCredentials: true,
  });
};


export const removeLectureInfo = (lectureId) => {
  return axios.delete(`${serverUrl}/api/course/removelecture/${lectureId}`, {
    withCredentials: true,
  });
};


export const getCreatorInfo = (selectedCourse) => {
  return axios.post(`${serverUrl}/api/course/creator`, {
    userId: selectedCourse ? selectedCourse.creator : null
  }, {
    withCredentials: true,
  });
};
//razorpay order api
export const razorOrder = (userId,courseId) => {
  return axios.post(`${serverUrl}/api/order/razorpay-order`, {
    userId, courseId
  }, {
    withCredentials: true,
  });
};


export const razorOrderVerify = (response,courseId,userId) => {
  return axios.post(`${serverUrl}/api/order/verify-payment`, {
    ...response,courseId,userId
  }, {
    withCredentials: true,
  });
};

export const submitReview = async ({ rating, comment, courseId }) => {
  return axios.post(
    "http://localhost:8000/api/review/givereview",
    {
      rating,
      comment,
      courseId,
    },
    { withCredentials: true }
  );
};

export const getAllReviewApi = async () => {
  return axios.get(
    "http://localhost:8000/api/review/allReview",
    { withCredentials: true }
  );
};

export const recommendationResult = (query) => {
  return axios.post(`${serverUrl}/api/course/search`, { input: query }, { withCredentials: true });
};



