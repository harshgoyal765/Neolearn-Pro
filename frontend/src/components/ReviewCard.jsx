import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ comment, rating, photoUrl, name, description, courseTitle }) => {
  return (
    <div className="w-full max-w-md bg-gradient-to-br from-purple-800 via-indigo-200 to-indigo-400 hover:scale-[1.02] hover:-translate-y-1 duration-200
shadow-lg rounded-2xl p-5 border border-gray-200 hover:shadow-xl transition-all h-full flex flex-col">
      
      {/* User Section */}
      <div className="flex items-center gap-4">
        <img
          src={photoUrl}
          alt={name}
          className="w-14 h-14 rounded-full object-cover border"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`${
              star <= Math.round(rating) ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-700 ml-1">{rating.toFixed(1)}</span>
      </div>

      {/* Course title */}
      <p className="text-[15px] font-medium mt-1"style={{ color: "#030d46" }}>
        Reviewed for  :  {courseTitle}
      </p>

      {/* Comment */}
      <p className="text-gray-800 mt-3 text-sm leading-relaxed">
        {comment}
      </p>
    </div>
  );
};

export default ReviewCard;
