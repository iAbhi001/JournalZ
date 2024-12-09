import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "https://journalz.onrender.com/api", // Deployed backend's base URL
  // baseURL: "http://localhost:5000/api", // Loclal backend URL
});

// Attach Authorization token from cookies to every request
API.interceptors.request.use((config) => {
  const token = Cookies.get("token"); // Retrieve token from cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
