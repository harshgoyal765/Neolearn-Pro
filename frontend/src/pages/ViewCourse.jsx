import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import img from "../assets/empty.jpg";
import WriteReview from "./WriteReview";
import { getCreatorInfo, razorOrder, razorOrderVerify } from "../services/api";
import Card from "../components/Card";

const ViewCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { courseData, selectedCourse } = useSelector((state) => state.course)
  const {userData} = useSelector((state) => state.user)
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState([]);
 const [isEnrolled, setIsEnrolled] = useState(false);
  // Handle review submission

  const handleReviewSubmit = (review) => {
    // Here you can call your backend API to save the review
    console.log("Review submitted:", review);
    // Example: API call to submit review goes here
  };

  useEffect(() => {
    const fetchCourseData = () => {
      const foundCourse = courseData.find((course) => course._id === courseId);
      if (foundCourse) {
        dispatch(setSelectedCourse(foundCourse));
        // If lectures exist, select the first one
        if (foundCourse.lectures?.length > 0) {
          setSelectedLecture(foundCourse.lectures[0]);
        }
      }
    };
    fetchCourseData();
  }, [courseData, courseId, dispatch]);


useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [courseId]);




useEffect(() => {
  if (!creatorData?._id || !courseData?.length) return;

  const creatorCourse = courseData.filter(
    (course) =>
      course.creator?.[0]?._id === creatorData._id && course._id !== courseId
  );
   checkEnrollment()
  setCreatorCourses(creatorCourse);
}, [creatorData, courseData, courseId ,userData]);

  
  
useEffect(() => {
  const handleCreator = async () => {
    if (selectedCourse?.creator) {
      try {
        const result = await getCreatorInfo(selectedCourse);
        console.log("Creator Info:", result.data);
        setCreatorData(result.data);
      } catch (error) {
        console.error("Failed to fetch creator info", error);
      }
    }
  };
  handleCreator();
}, [selectedCourse]); 
  
  const checkEnrollment = () => {
    const verify = userData?.enrolledCourses?.some(
      c => (typeof c === 'string' ? c : c._id).toString() === courseId?.toString())
    if (verify) {
      setIsEnrolled(true)
    }
   
  }
  
  const handleEnroll = async(userId ,courseId) => {
    try {
      const orderData = await razorOrder(userId, courseId)
      console.log("Order Data:", orderData);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: orderData.data.amount,
        currency: 'INR',
        name: 'NeoLearn',
        description: 'Course Enrollment',
        order_id: orderData.data.id,
        handler: async function (response) {
          console.log("Payment Response:", response);
          alert('Payment Successful!');
          try {
            const verifyPayment = await razorOrderVerify(response, courseId, userId)
            setIsEnrolled(true)
            toast.success(verifyPayment.data.message )
          } catch (error) {
            toast.error(error.response.data.message)
          }
        }
        
      }
      const rzp = new window.Razorpay(options)
      rzp.open();
    }
    catch (error) {
      console.log(error)
      toast.error("Something went wrong" )
    }
  }


  return (
    <div className="bg-white min-h-screen p-6 md:p-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 flex items-center gap-2 text-black hover:text-gray-700"
      >
        <FaArrowLeftLong className="text-xl" />
        <span className="text-md font-medium">Back</span>
      </button>

      {/* Top Section: Image & Info */}
    <div className="flex flex-col md:flex-row gap-6 items-start bg-white p-4 rounded-xl shadow-lg">
  {/* Left: Image */}
  <div className="w-full md:w-1/2">
    <div className="relative pt-[56.25%] w-full rounded-xl overflow-hidden shadow-md">
      <img
        src={selectedCourse?.thumbnail || img}
        alt="Course Thumbnail"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Right: Course Info */}
  <div className="w-full md:w-1/2 space-y-3 flex flex-col justify-between">
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">{selectedCourse?.title || "Course Title"}</h2>
      <p className="text-gray-600 text-sm">{selectedCourse?.subtitle || "Course subtitle"}</p>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-yellow-500">⭐</span>
        <span className="font-semibold">{selectedCourse?.rating || 5}</span>
        <span className="text-gray-500">({selectedCourse?.reviews || "1,200"} Reviews)</span>
      </div>

      <div className="flex items-center gap-2 text-lg font-semibold">
        <span className="text-green-600">₹{selectedCourse?.price || 199}</span>
        {selectedCourse?.discountedPrice && (
          <span className="line-through text-gray-400 text-base">₹{selectedCourse.discountedPrice}</span>
        )}
      </div>

      <ul className="text-sm text-gray-700 space-y-1">
        <li className="flex items-center gap-2">
          <span className="text-green-500">✅</span> 10+ hours of video content
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-500">✅</span> Lifetime access to course materials
        </li>
      </ul>
    </div>

  {!isEnrolled ? <button className="bg-black text-white px-6 py-2 rounded-md w-fit hover:scale-105 transition mt-4" onClick={()=>handleEnroll(userData._id,courseId)}>
      Enroll Now
    </button>:<button className="bg-green-400 text-green-950 px-6 py-2 rounded-md w-fit hover:scale-105 transition mt-4" onClick={()=>navigate(`/viewLecture/${courseId}`)}>
      Watch Now
    </button>}
  </div>
</div>


      {/* Additional Sections */}
      <div className="mt-10 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">What You’ll Learn</h3>
          <ul className="list-disc list-inside text-gray-700">
            {selectedCourse?.category ? (
              <li>Learn {selectedCourse.category} From Beginning</li>
            ) : (
              <li>Learn AI Tools from the Beginning</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Requirements</h3>
          <p className="text-gray-700">
            {selectedCourse?.requirements ||
              "Basic programming knowledge is helpful but not required."}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Who This Course is For</h3>
          <p className="text-gray-700">
            {selectedCourse?.targetAudience ||
              "Beginners, aspiring developers, and professionals."}
          </p>
        </div>
      </div>

      {/* Course Curriculum */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Lecture List */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border">
          <h3 className="text-xl font-semibold mb-3">Course Curriculum</h3>
          <p className="text-sm text-gray-500 mb-6">
            {selectedCourse?.lectures?.length || 0} Lecture
            {selectedCourse?.lectures?.length > 1 ? "s" : ""}
          </p>

          <div className="space-y-2">
            {selectedCourse?.lectures?.map((lecture, idx) => {
              const isSelected = selectedLecture?._id === lecture._id;
              const isPreview = lecture.isPreviewFree;

              return (
                <button
                  key={lecture._id}
                  onClick={() => {
                    if (isPreview) setSelectedLecture(lecture);
                  }}
                  disabled={!isPreview}
                  className={`flex items-center w-full px-4 py-3 rounded-lg border text-left transition duration-200
              ${isSelected ? "bg-black text-white" : "bg-white text-gray-800"}
              ${
                !isPreview
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200 hover:text-black"
              }`}
                >
                  ▶️{" "}
                  <span className="ml-2 font-medium">Lecture {idx + 1}:</span>
                  &nbsp;
                  <span className="truncate">{lecture.lectureTitle}</span>
                  {!isPreview && (
                    <span className="ml-auto text-xs italic text-red-500">
                      Locked 🔒
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Video Player or Locked */}
        {selectedLecture?.isPreviewFree ? (
          <div className="bg-white rounded-xl p-4 shadow-md border w-full">
            <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg mb-4">
              <video
                controls
                className="w-full h-full object-cover rounded"
                src={selectedLecture.videoUrl}
              />
            </div>
            <h4 className="text-lg font-semibold mb-1">
              {selectedLecture.lectureTitle}
            </h4>
            <p className="text-sm text-gray-500">{selectedCourse?.title}</p>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl p-6 shadow flex flex-col items-center justify-center text-center text-gray-600 h-64 border">
            <div className="text-3xl mb-3">🔒</div>
            <p className="text-lg font-semibold mb-1">Preview Not Available</p>
            <p className="text-sm">
              This lecture is locked. Please enroll to access it.
            </p>
          </div>
        )}
      </div>
      <WriteReview onSubmit={handleReviewSubmit} />
      {/* for creator info   */}
      <div className="flex items-center gap-4 pt-4 border-t">
        {creatorData?.photoUrl ? (
          <img
            src={creatorData?.photoUrl}
            alt=""
            className="'w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <img
            src={img}
            className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl text-white"
          />
        )}
        <div>
          <h4 className="text-lg font-semibold">
            {creatorData?.name || "Creator Name"}
          </h4>
          <p className="text-sm text-gray-500">
            {creatorData?.description || "creator"}
          </p>
          <p className="text-sm text-gray-500">
            {creatorData?.email || "email@example.com"}
          </p>
        </div>
      </div>

     <div className="mt-16">
  <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
    Other Courses by the Educator
  </h3>

  <div className="bg-white rounded-xl shadow-md p-6">
    {creatorCourses && creatorCourses.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {creatorCourses.map((course, index) => (
          <Card
            key={course._id || index}
            thumbnail={course.thumbnail || img}
            id={course._id}
            price={course.price || 0}
            title={course.title || "Untitled Course"}
            category={course.category || "General"}
          />
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 py-10">
        No other courses available from this educator.
      </p>
    )}
  </div>
</div>



      
    </div>
  );
};

export default ViewCourse;
