import axios from "axios";

const URL = `http://localhost:5000`;

const instanceAPI = axios.create({
  baseURL: URL,
});

instanceAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    if (req.headers) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile") || "").token
      }`;
    }
  }

  return req;
});
