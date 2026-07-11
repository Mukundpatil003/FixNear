import api from "./axios";

export const getPendingRequests = async () => {
  const response = await api.get("/service-request/pending");
  return response.data;
};

export const acceptRequest = async (requestId) => {
  const response = await api.put(
    `/booking/accept/${requestId}`
  );

  return response.data;
};

export const rejectRequest = async (requestId) => {
  const response = await api.put(
    `/booking/reject/${requestId}`
  );

  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get(
    "/booking/my-bookings"
  );

  return response.data;
};

export const completeBooking = async (bookingId) => {
  const response = await api.put(
    `/booking/complete/${bookingId}`
  );

  return response.data;
};