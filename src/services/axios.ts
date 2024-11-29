import axios from "axios";

// Create an instance of Axios with default settings
console.log(
  "process.env.REACT_APP_API_BASE_URL..",
  process.env.REACT_APP_API_BASE_URL
);
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = axiosInstance;
