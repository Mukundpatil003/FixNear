import api from "./axios";

// Get all customer bookings
export const getCustomerBookings = async () => {
  const { data } = await api.get("/booking/customer");
  return data;
};

// Get single booking
export const getBookingDetails = async (bookingId) => {
  const { data } = await api.get(`/booking/customer/${bookingId}`);
  return data;
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
  const { data } = await api.put(`/booking/customer/cancel/${bookingId}`);
  return data;
};