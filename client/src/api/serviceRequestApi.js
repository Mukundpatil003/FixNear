import api from "./axios";

// Create Service Request
export const createServiceRequest = async (requestData) => {
  const response = await api.post(
    "/service-request",
    requestData
  );

  return response.data;
};

// Search Nearby Providers
export const searchProviders = async ({
  service,
  latitude,
  longitude,
}) => {
  const response = await api.get(
    "/service-request/providers",
    {
      params: {
        service,
        latitude,
        longitude,
      },
    }
  );

  return response.data;
};

// Provider Pending Requests
export const getPendingRequests = async () => {
  const response = await api.get(
    "/service-request/pending"
  );

  return response.data;
};



export const getMyRequests = async () => {
  const response = await api.get(
    "/service-request/my-requests"
  );

  return response.data;
};