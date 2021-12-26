import create from "zustand";
import axios from "axios";

import { fetchAllQuizzes, deleteQuiz } from "api/api";
import produce from "immer";

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
  isDeleting: boolean;
  errorMessage: string;
  successMessage: string;

  fetchAllQuizzes: () => Promise<void>;
  deleteQuiz: (quizDbId: string, quizId: string) => Promise<void>;
}

export const quizStore = create<IQuizStore>((set, get) => ({
  quizzes: [],
  isLoading: false,
  isDeleting: false,

  successMessage: "",
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

  deleteQuiz: async (quizDbId: string, quizId: string) => {
    set({ errorMessage: "" });

    try {
      set({ isDeleting: true });

      const response = await deleteQuiz(quizDbId);

      if (response.status === 200) {
        set({ successMessage: response.data.message });

        set(
          produce((state) => {
            state.quizzes = state.quizzes.filter(
              (quiz: { id: string }) => quiz.id !== quizId
            );
          })
        );

        const clearingTimeout = setTimeout(() => {
          set({ successMessage: "", errorMessage: "" });
          clearTimeout(clearingTimeout);
        }, 2500);
      }

      set({ isDeleting: false });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e?.response?.data.message);

        set({ errorMessage: e?.response?.data.message });

        if (e?.response?.data.message === undefined) {
          set({ errorMessage: "Something went wrong. Try again a bit later." });
        }

        set({ isDeleting: false });
      }
    }
  },
}));
