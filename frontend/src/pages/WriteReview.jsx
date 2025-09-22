import React, { useState } from "react";

const WriteReview = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const stars = [1, 2, 3, 4, 5];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    onSubmit({ rating, reviewText });
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="max-w-full mx-auto mt-12 p-6 bg-gray-50 rounded-xl shadow-md ">
      <h3 className="text-xl font-semibold mb-6 text-center">Write a Review</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Star Rating */}
        <div className="flex justify-center space-x-3 text-yellow-400 text-4xl">
          {stars.map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`focus:outline-none transition-colors ${
                (hoverRating || rating) >= star
                  ? "text-yellow-400"
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
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-4 resize-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition duration-200"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default WriteReview;
