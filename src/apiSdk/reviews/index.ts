import axios from 'axios';
import { ReviewsInterface } from 'interfaces/reviews';

export const getReviews = async () => {
  const response = await axios.get(`/api/reviews`);
  return response.data;
};

export const createReviews = async (reviews: ReviewsInterface) => {
  const response = await axios.post('/api/reviews', reviews);
  return response.data;
};

export const updateReviewsById = async (id: string, reviews: ReviewsInterface) => {
  const response = await axios.put(`/api/reviews/${id}`, reviews);
  return response.data;
};

export const getReviewsById = async (id: string) => {
  const response = await axios.get(`/api/reviews/${id}`);
  return response.data;
};
