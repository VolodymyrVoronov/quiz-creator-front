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

const signup = (data: {
  avatar?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}) => {
  return instanceAPI.post("/signup", data);
};

const signin = (data: { email: string; password: string }) => {
  return instanceAPI.post("/signin", data);
};

export { signup, signin };
