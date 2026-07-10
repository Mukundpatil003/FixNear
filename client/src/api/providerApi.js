import api from "./axios";

export const getTopProviders = async () => {
  const response = await api.get("/provider/top");
  return response.data;
};