import api from "./axios";


export const submitReview = async (reviewData) => {

  const { data } = await api.post(
    "/reviews",
    reviewData
  );

  return data;

};


export const getProviderReviews = async (providerId) => {

  const { data } = await api.get(
    `/reviews/${providerId}`
  );

  return data;

};