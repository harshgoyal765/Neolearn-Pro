import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setReviewData } from '../redux/reviewSlice'
import { getAllReviewApi } from '../services/api';

const getAllReviews = () => {

  const dispatch = useDispatch();   

  useEffect(() => {

    const allReviews = async () => {
      try {
        const result = await getAllReviewApi();  
        console.log('All Reviews:', result.data);

        dispatch(setReviewData(result.data));    
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    allReviews();
  }, []);

  return null;   // Component must return something
};

export default getAllReviews;
