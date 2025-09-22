import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCoursesByid, removedCourse, updateCourse } from "../../services/api";
import img from "../../assets/empty.jpg";
import { ClipLoader } from "react-spinners";
import { setCourseData } from "../../redux/courseSlice";
import { useDispatch, useSelector } from "react-redux";

const EditCourse = () => {
 
  const { courseId } = useParams();

  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [selectCourse ,setSelectCourse]=useState(null)
  
  // Individual States
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [frontendImage, setFrontendImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null);

  const dispatch = useDispatch()

  const {courseData}=useSelector(state=>state.course)

  // ✅ Fetch course by ID
  const getCourseById = async () => {
    try {
      const result = await getCoursesByid(courseId);
  
      if (result?.data) {
        setTitle(result.data.title || "");
        setSubTitle(result.data.subTitle || "");
        setDescription(result.data.description || "");
        setCategory(result.data.category || "");
        setLevel(result.data.level || "");
        setPrice(result.data.price || "");
        setIsPublished(result.data.isPublished || false);
        setFrontendImage(result.data.thumbnail || img);
        setSelectCourse(result.data)
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Failed to load course details");
    }
  };

  // ✅ Update Course
  const handleEditCourse = async () => {
    setLoading1(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("level", level);
      formData.append("price", Number(price));
      formData.append("isPublished", isPublished ? "true" : "false");

      if (backendImage) {
        formData.append("thumbnail", backendImage);
      }
      console.log("edit course",formData)

      const res = await updateCourse(courseId, formData);
      const updateData = res.data
      if (updateData.isPublished) {
        const updateCourses = courseData.map(c => c._id === courseId ? updateData : c)
      
       if (!courseData.some(c => c._id === courseId)) {
  updateCourses.push(updateData)
}
        dispatch(setCourseData(updateCourses))
      }
      else {
        const filterCourses = courseData.filter(c => c._id !== courseId)
        dispatch(setCourseData(filterCourses))
      }
      toast.success("Course updated successfully!");
      console.log("Updated course:", res.data);

      navigate("/courses"); // redirect after update
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  
//   // ✅ Handle Thumbnail Upload
const handleThumbnailChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const ratio = img.width / img.height;
      const youtubeRatio = 16 / 9;

      if (Math.abs(ratio - youtubeRatio) > 0.1) {
        alert("Please upload an image with 16:9 aspect ratio (YouTube thumbnail size).");
        return;
      }

      // ✅ File ko backend ke liye set karo
      setBackendImage(file);  

      // ✅ Preview ke liye frontendImage
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontendImage(reader.result);
      };
      reader.readAsDataURL(file);
    };
  }
};

  // ✅ Toggle publish/unpublish
  const handlePublishToggle = () => {
    setIsPublished((prev) => !prev);
    toast.info(isPublished ? "Course moved to Draft" : "Course Published!");
  };

  
const handleRemove = async () => {
  setLoading1(true);
  try {
    const result = await removedCourse(courseId); // only send ID
    toast.success("Course Removed");
    console.log(result.data);
    const filterCourses = courseData.filter(c => c._id !== courseId)
    dispatch(setCourseData(filterCourses))
    navigate("/courses");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to remove course");
  } finally {
    setLoading1(false);
  }
};


  useEffect(() => {
    getCourseById();
    console.log("Fetch course details with ID:", courseId);
  }, [courseId]);

  return (
    <div className="p-6 w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center text-gray-700 hover:text-black transition"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-black text-white shadow hover:scale-105 transition" onClick={()=> navigate(`/createlecture/${selectCourse?._id}`)}
        >
          Go to lectures page
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Course Details</h1>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handlePublishToggle}
          className={`px-4 py-2 rounded-lg font-semibold shadow ${
            isPublished ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {isPublished ? "Unpublish" : "Click to Publish"}
        </button>
        <button
          onClick={handleRemove}
          className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:opacity-90"
        >
          Remove Course
        </button>
      </div>

      {/* Form */}
      <form
        className="bg-white rounded-xl shadow-lg p-6 space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="SubTitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          placeholder="Course Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-3"
        ></textarea>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">Select Category</option>
            <option value="programming">Programming</option>
            <option value="designing">Design</option>
            <option value="marketing">Marketing</option>
            <option value="ai-ml">AI & ML</option>
            <option value="data-science">Data Science</option>
            <option value="ui-ux">UI/UX Designing</option>
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <input
            type="number"
            placeholder="Price ₹ (INR)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-lg p-3"
          />
        </div>

        {/* Thumbnail Upload */}
        <div>
  <p className="font-medium mb-2">Course Thumbnail</p>
<label className="relative flex flex-col items-center justify-center 
  w-[320px] aspect-video border-2 border-dashed border-gray-300 
  rounded-xl cursor-pointer hover:border-indigo-400 transition overflow-hidden">
  <input
    type="file"
    className="hidden"
    accept="image/*"
    onChange={handleThumbnailChange}
  />
  {frontendImage ? (
    <img
      src={frontendImage}
      alt="Thumbnail"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-gray-500">Upload Thumbnail (16:9)</span>
  )}
</label>

</div>

        {/* Save & Cancel */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => navigate("/courses")}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleEditCourse}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:scale-105 transition"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
