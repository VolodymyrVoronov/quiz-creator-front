import axios from "axios";

import { IQuestion } from "store/quizCreatorStore";

interface ISaveNewQuiz {
  userId: string;
  userAvatar: string;
  id: string;
  quizTitle: string;
  questions: IQuestion[];
}

const URL = `http://localhost:5000`;

const instanceAPI = axios.create({
  baseURL: URL,
});

instanceAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("userData")) {
    if (req.headers) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("userData") || "").token
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

const saveNewQuiz = (data: ISaveNewQuiz) => {
  return instanceAPI.post("/quiz", data);
};

const fetchAllQuizzes = () => {
  return instanceAPI.get("/quiz");
};

const deleteQuiz = (quizDbId: string) => {
  return instanceAPI.delete(`/quiz/${quizDbId}`);
};

export { signup, signin, saveNewQuiz, fetchAllQuizzes, deleteQuiz };
