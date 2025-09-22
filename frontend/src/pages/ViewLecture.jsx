import React, { useState } from 'react';

const ViewLecture = ({ course, lectures, creator }) => {
  const [selectedLecture, setSelectedLecture] = useState(lectures[0]);

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left: Video and Course Info */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow">
          {/* Header */}
          <div className="mb-4">
            <button className="text-gray-600 mb-2 hover:text-black">&larr; Back</button>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-sm text-gray-500">
              Category: {course.category} &nbsp; | &nbsp; Level: {course.level}
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
              {lectures.map((lecture, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`cursor-pointer px-4 py-2 rounded-lg border flex justify-between items-center transition
                    ${
                      selectedLecture?.title === lecture.title
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
                    }`}
                >
                  {lecture.title}
                  <span>▶</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Creator */}
          <div className="pt-4 border-t">
            <h3 className="text-md font-semibold mb-2">Creator</h3>
            <div className="flex items-center gap-3">
              <img
                src={creator.photoUrl}
                alt="Creator"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{creator.name}</p>
                <p className="text-sm text-gray-500">{creator.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLecture;
