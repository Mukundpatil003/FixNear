import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api`
    : "https://fixnear-fjqc.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token from localStorage to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;