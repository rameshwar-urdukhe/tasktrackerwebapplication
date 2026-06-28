// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://task-tracker-app-l861.onrender.com/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:3000/api"
      : "https://task-tracker-app-l861.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
