import React, { useState } from "react";
import { toast } from "react-toastify";
import { submitReview } from "../services/api";

const WriteReview = ({ onSubmit, courseId }) => {
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const stars = [1, 2, 3, 4, 5];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    try {
      
      setLoading(true);
      console.log("Before API Call:", { rating, comment, courseId });
      const result = await submitReview({ rating, comment, courseId });
      
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");

      if (onSubmit) onSubmit(result); 
    } catch (error) {
      console.error("Review submission failed:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
        Write a Review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div className="flex justify-center space-x-3 text-yellow-400 text-4xl">
          {stars.map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`focus:outline-none transition-transform duration-200 ${
                (hoverRating || rating) >= star
                  ? "text-yellow-400 scale-110"
                  : "text-gray-300"
              }`}
              aria-label={`${star} Star`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          rows={5}
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-4 resize-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-900"
          }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default WriteReview;
