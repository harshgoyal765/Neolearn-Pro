import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editLectureInfo, removeLectureInfo } from "../../services/api";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const EditLecture = () => {
  const { courseId, lectureId } = useParams()
  const { lectureData } = useSelector(state => state.lecture)
  const selectedLecture = lectureData.find(lecture =>lecture._id == lectureId)
  const navigate = useNavigate()
  const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle);
  const [videoUrl, setVideoUrl] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const dispatch = useDispatch()

 
   const formData = new FormData();
    formData.append("lectureTitle", lectureTitle);
    formData.append("videoUrl", videoUrl);
   formData.append("isPreviewFree", isPreviewFree ? "true" : "false");


  const handleEditLecture = async () => {
    setLoading(true)
    try {
      const result = await editLectureInfo(lectureId, formData)
      console.log("update lecture data",result.data)
      dispatch(setLectureData([...lectureData, result.data]))
      toast.success("lecture update successfully")
      navigate("/courses")
      setLoading(false)
    }
    catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  };

  const handleRemove = async () => {
    setLoading1(true)
    try {
      const result = await removeLectureInfo(lectureId)
      console.log(result.data)
      navigate(`/createLecture/${courseId}`)
      toast.success("Lecture removed successfully")
      setLoading1(false)
    }
    catch (error) {
      setLoading1(false)
      toast.error(error.response.data.message)
   }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md space-y-6 ">
        <div className="flex"> <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => navigate("/profile")}
            className="cursor-pointer text-black text-2xl"
        />
          <h2 className="text-xl font-semibold text-gray-800 ml-2">Update Course Lecture</h2>
          </div>
        <button
          onClick={handleRemove}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"disabled={loading1}
        >
           {loading1 ? <ClipLoader size={30} color="white" /> : " Remove Lecture"}
        </button>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Lecture Title</label>
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="w-full border rounded p-3"
            placeholder="Lecture Title"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Video *</label>
          <input
            type="file"
            onChange={(e)=>setVideoUrl(e.target.files[0])}
            className="w-full border rounded p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:text-sm file:bg-gray-700 file:text-[white] hover:file:bg-gray-500"
            accept="video/*"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isFree"
            checked={isPreviewFree}
            onChange={() => setIsPreviewFree(prev=>!prev)}
          />
          <label htmlFor="isFree" className="text-gray-700">
            Is this video FREE
          </label>
          {loading ? <p>Uploading video please wait ...</p>:""}
        </div>

        <button
          onClick={handleEditLecture}
          className="w-full bg-black text-white py-2 rounded hover:scale-105 transition"disabled={loading}
        >
          {loading ? <ClipLoader size={30} color="white" /> : " Update Lecture"}
        </button>
      </div>
    </div>
  );
};

export default EditLecture;
