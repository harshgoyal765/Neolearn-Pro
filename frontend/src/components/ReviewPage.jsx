


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";

const ReviewPage = () => {
  const { reviewData } = useSelector((state) => state.review);
  const [latestReviews, setLatestReviews] = useState([]);
  console.log("All Reviews in ReviewPage:", reviewData);
  useEffect(() => {
    if (Array.isArray(reviewData) && reviewData.length > 0) {
      const latest = [...reviewData]
        .sort((a, b) => new Date(b.reviewedAt) - new Date(a.reviewedAt))
        .slice(0, 5);

      setLatestReviews(latest);
    }
  }, [reviewData]);

  return (
    <div className="
      w-full max-w-full mx-auto 
      p-1 md:p-10
      bg-gradient-to-t from-indigo-500 via-indigo-100 to-purple-50 
      rounded-xl shadow-xl 
      space-y-8
    ">
      {/* Page heading */}
      <div className="text-center ">
        <h1 className="text-4xl font-extrabold text-black tracking-wide ">
          ⭐ Real Review For Real Courses
        </h1>
        <p className="text-black/80 text-lg">
          What students are saying about our courses
        </p>
      </div>

      
      <div className="w-full flex justify-center">
  <div 
    className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      gap-8 
      max-w-5xl 
      w-full 
      mx-auto 
      place-items-center
    "
  >
    {latestReviews.map((review) => (
      <ReviewCard
        key={review._id}
        comment={review.comment}
        rating={review.rating}
        photoUrl={review.user?.photoUrl}
        name={review.user?.name}
        description={review.user?.description}
        courseTitle={review.course?.title}
      />
    ))}
  </div>
</div>

    </div>
  );
};

export default ReviewPage;
