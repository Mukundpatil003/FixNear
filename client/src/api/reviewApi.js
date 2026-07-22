import api from "./axios";

/* ==========================================
   Get My Reviews
========================================== */

export const getMyReviews = async () => {
  const response = await api.get("/reviews");
  return response.data;
};

/* ==========================================
   Give Review
========================================== */

export const giveReview = async (data) => {
  const response = await api.post("/reviews", data);
  return response.data;
};

/* ==========================================
   Update Review
========================================== */

export const updateReview = async (id, data) => {
  const response = await api.put(`/reviews/${id}`, data);
  return response.data;
};

/* ==========================================
   Delete Review
========================================== */

export const deleteReview = async (id) => {
  const response = await api.delete(`/reviews/${id}`);
  return response.data;
};

/* ==========================================
   Provider Reviews
========================================== */

export const getProviderReviews = async (providerId) => {
  const response = await api.get(`/reviews/provider/${providerId}`);
  return response.data;
};