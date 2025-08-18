// lib/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Use environment variables for base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
