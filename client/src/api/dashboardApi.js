import api from "./axios";

export const getCustomerDashboard = async () => {
  const { data } = await api.get("/dashboard/customer");

  return data;
};