import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { createCourse } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const CreateCourse = () => {
  const navigate=useNavigate()
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const[loading,setLoading]=useState(false)


  const handleCreateCourse = async () => {
  setLoading(true);
  try {
    const result = await createCourse(title, category);
    navigate("/courses")
    setLoading(false)
    toast.success(result.data.message || "Course Created");
    
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message || "Something went wrong");
    } else if (error.request) {
      toast.error("Server not responding. Please check backend.");
    } else {
      toast.error(error.message);
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg shadow-black p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>
          <h2 className="flex-1 text-center text-xl font-semibold text-gray-800">
            Create Course
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Course Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select category</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="App Development">App Development</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="Data Science">Data Science</option>
              <option value="Programming">Programming</option>
              <option value="AI & ML">AI & ML</option>
              
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleCreateCourse}
            className="w-full py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? <ClipLoader size={35} color='white' />:"Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
