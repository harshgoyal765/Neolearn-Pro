import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCreatorInfo } from '../services/api';

const ViewLecture = () => {
  const { courseId } = useParams();
  const { courseData, loading: coursesLoading } = useSelector((state) => state.course);
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);

 useEffect(() => {
  if (!coursesLoading && courseData?.length) {
    const course = courseData.find((c) => c._id.toString() === courseId);
    setSelectedCourse(course || null);
    setLectures(course?.lectures || []);
    setSelectedLecture(course?.lectures?.[0] || null);

    // ✅ Correct logs:
    console.log("Selected Course:", course);
    console.log("Lectures:", course?.lectures);
  }
}, [courseData, courseId, coursesLoading]);

  // Fetch creator info
  useEffect(() => {
    const fetchCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await getCreatorInfo(selectedCourse);
          setCreatorData(result.data);
        } catch (error) {
          console.error("Failed to fetch creator info", error);
        }
      }
    };
    fetchCreator();
  }, [selectedCourse]);

 

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left: Video and Course Info */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <button
              className="text-gray-600 mb-2 hover:text-black"
              onClick={() => navigate(-1)}
            >
              &larr; Back
            </button>
            <h1 className="text-2xl font-bold">{selectedCourse?.title}</h1>
            <p className="text-sm text-gray-500">
              Category: {selectedCourse?.category} &nbsp; | &nbsp; Level: {selectedCourse?.level}
            </p>
          </div>

          {/* Video */}
          <div className="relative aspect-video mb-4">
            <video
              controls
              src={selectedLecture?.videoUrl}
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* Lecture Title */}
          <p className="text-sm font-semibold">{selectedLecture?.title}</p>
        </div>

        {/* Right: Lectures + Creator Info */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow space-y-6">
          {/* Lectures */}
          <div>
            <h2 className="text-lg font-semibold mb-2">All Lectures</h2>
            <ul className="space-y-2">
              {lectures.map((lecture) => (
                <li
                  key={lecture._id}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`cursor-pointer px-4 py-2 rounded-lg border flex justify-between items-center transition
                    ${
                      selectedLecture?._id === lecture._id
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
                    }`}
                >
                  {lecture.lectureTitle}
                  <span>▶</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Creator Info */}
          <div className="pt-4 border-t">
            <h3 className="text-md font-semibold mb-2">Creator</h3>
            {creatorData ? (
              <div className="flex items-center gap-3">
                <img
                  src={creatorData?.photoUrl}
                  alt="Creator"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{creatorData?.name}</p>
                  <p className="text-sm text-gray-500">{creatorData?.role}</p>
                  <p className="text-sm text-gray-500">{creatorData?.email}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Loading creator info...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLecture;
