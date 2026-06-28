import axios from "axios";

const api = axios.create({
  baseURL: "https://task-tracker-app-l861.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
