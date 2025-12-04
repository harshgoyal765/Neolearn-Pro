import React from "react";
import { FaStar } from "react-icons/fa6";
import emptyImg from "../assets/empty.jpg";
import { useNavigate } from "react-router-dom";

function Card({ thumbnail, title, category, price, id, reviews}) {
  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };


  const avgRating = calculateAvgReview(reviews);

  const navigate = useNavigate()
  return (
    <div className="max-w-sm w-full bg-white rounded-2xl overflow-hidden 
  shadow-md hover:shadow-xl 
  hover:-translate-y-2 transform transition-all duration-300
  border border-gray-200 hover:border-indigo-400" onClick={()=>navigate(`viewcourse/${id}`)}>
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={thumbnail || emptyImg}
          alt={title}
          className="w-full h-48 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
        />
        {/* Category Badge on Thumbnail */}
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {title}
        </h2>

       {/* Rating */}
<div className="flex items-center gap-1 text-sm">
  {[1, 2, 3, 4, 5].map((star) => (
    <FaStar
      key={star}
      className={`${
        star <= Math.round(avgRating)
          ? "text-yellow-500"
          : "text-gray-300"
      }`}
    />
  ))}
  <span className="text-gray-600 text-xs ml-1">{avgRating}</span>
</div>


        {/* Price */}
        <p className="text-indigo-600 font-bold text-xl">₹{price}</p>

        {/* Button */}
        <button className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-800 shadow-md hover:from-purple-600 hover:to-indigo-500 text-white py-2 rounded-xl font-medium transition-all duration-300 cursor-pointer">
          View Course
        </button>
      </div>
    </div>
  );
}

export default Card;
