import api from "./axios";

// Home Page
export const getTopProviders = async () => {
  const response = await api.get("/provider/nearby", {
    params: {
      latitude: 18.5204,
      longitude: 73.8567,
    },
  });

  return response.data;
};

// Dashboard
export const getProviderDashboard = async () => {
  const response = await api.get("/provider/dashboard");
  return response.data;
};

export const getProviderProfile = async () => {
  const response = await api.get("/provider/profile");
  return response.data;
};

export const updateProviderProfile = async (data) => {
  const response = await api.put("/provider/profile", data);
  return response.data;
};