import create from "zustand";
import axios from "axios";

import { fetchAllQuizzes } from "api/api";

export interface IAnswerOption {
  id: string;
  answerOption: string;
  correct: boolean;
  userAnswer: boolean;
}

export interface IQuestion {
  id: string;
  question: string;
  options: IAnswerOption[];
}

export interface IQuiz {
  id: string;
  _id: string;
  userId: string;
  userAvatar: string;
  quizTitle: string;
  questions: IQuestion[];
}

interface IQuizStore {
  quizzes: IQuiz[];
  isLoading: boolean;
  errorMessage: string;

  fetchAllQuizzes: () => Promise<void>;
}

export const quizStore = create<IQuizStore>((set, get) => ({
  quizzes: [],
  isLoading: false,
  errorMessage: "",

  fetchAllQuizzes: async () => {
    set({ errorMessage: "" });

    try {
      set({ isLoading: true });

      const response = await fetchAllQuizzes();

      if (response.status === 200) {
        set({ quizzes: response.data.quizzes });
      }

      set({ isLoading: false });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e?.response?.data.message);

        set({ errorMessage: e?.response?.data.message });

        if (e?.response?.data.message === undefined) {
          set({ errorMessage: "Something went wrong. Try again a bit later." });
        }

        set({ isLoading: false });
      }
    }
  },
}));
