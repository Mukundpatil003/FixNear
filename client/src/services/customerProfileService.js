import api from "../api/axios";

export const getProfile = async () => {
  const { data } = await api.get("/customer/profile");
  return data;
};

export const updateProfile = async (body) => {
  const { data } = await api.put("/customer/profile", body);
  return data;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const { data } = await api.post("/upload/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};