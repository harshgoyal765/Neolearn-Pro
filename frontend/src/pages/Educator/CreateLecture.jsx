import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addLecture, getLecture } from "../../services/api";
import { toast } from "react-toastify";
import { setLectureData } from "../../redux/lectureSlice";
import { ClipLoader } from "react-spinners";


const CreateLecture = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);
  const [lectureLoading, setLectureLoading] = useState(true);

  const handleAddLecture = async () => {
    setLoading(true);
    try {
      const result = await addLecture(courseId, { lectureTitle });
      console.log(result.data);
      dispatch(setLectureData([...lectureData, result.data.lecture]));
      setLoading(false);
      toast.success("lecture added");
      setLectureTitle("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const getCourselecture = async () => {
      try {
        setLectureLoading(true);
        const result = await getLecture(courseId);
        console.log("lectures are", result.data);
        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        console.log(error);
      } finally {
        setLectureLoading(false);
      }
    };
    getCourselecture();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-indigo-300 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl shadow-[#030d46] w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">Let’s Add a Lecture</h2>
        <p className="text-gray-600 mb-4">
          Enter the title and add your video lectures to enhance your course
          content.
        </p>
        <input
          type="text"
          placeholder="e.g. Introduction to Mern Stack"
          className="w-full border rounded-lg p-3 mb-4 border-gray-300  focus:outline-none focus:ring-2 focus:ring-indigo-800"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
        />
        <div className="flex items-center gap-4 mb-6">
          <button
            className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer hover:scale-105"
            onClick={() => navigate(`/editcourse/${courseId}`)}
          >
            ← Back to Course
          </button>

          <button
            onClick={handleAddLecture}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-800  hover:from-purple-600 hover:to-indigo-500 text-white cursor-pointer rounded-lg hover:scale-105 transition"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "+ Create Lecture"
            )}
          </button>
        </div>
       
        {/* <div className="space-y-3">
          {lectureData?.map((lecture, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg hover:shadow"
            >
              <span className="font-medium">Lecture - {index + 1}: {lecture.lectureTitle}</span>
              <button
                onClick={() => alert(`Edit Lecture ${index + 1}`)}
                className="text-gray-600 hover:text-black"
              >
                <FaPen  onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)}/>
              </button>
            </div>
          ))}
        </div> */}
        <h3 className="text-lg font-semibold mb-2">List of Lectures</h3>
        {lectureLoading ? (
          <p className="text-gray-500">Loading lectures...</p>
        ) : lectureData?.length === 0 ? (
          <p className="text-gray-500">No lectures added yet.</p>
        ) : (
          <div className="space-y-3">
            {lectureData.map((lecture, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg hover:shadow"
              >
                <span className="font-medium">
                  Lecture - {index + 1}: {lecture.lectureTitle}
                </span>
                <button
                  onClick={() =>
                    navigate(`/editlecture/${courseId}/${lecture._id}`)
                  }
                  className="text-gray-600 hover:text-black"
                >
                  <FaPen />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLecture;
