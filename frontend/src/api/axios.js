import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend's base URL
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
