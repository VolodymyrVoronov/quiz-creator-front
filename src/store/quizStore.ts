import create from "zustand";
import axios from "axios";
import produce from "immer";

import { fetchAllQuizzes, deleteQuiz } from "api/api";

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
  chosenQuiz: IQuiz | undefined;
  quizResult: {
    correctAnswers: number;
    wrongAnswers: number;
  };

  fetchAllQuizzes: () => Promise<void>;
  deleteQuiz: (quizDbId: string, quizId: string) => Promise<void>;
  startQuiz: (quizId: string) => void;
  setUserAnswer: (
    questionId: string,
    optionId: string,
    userAnswer: boolean
  ) => void;
  getQuizResult: () => void;
  resetChosenQuiz: () => void;
}

export const quizStore = create<IQuizStore>((set, get) => ({
  quizzes: [],
  isLoading: false,
  isDeleting: false,

  successMessage: "",
  errorMessage: "",

  chosenQuiz: undefined,
  quizResult: {
    correctAnswers: 0,
    wrongAnswers: 0,
  },

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

  startQuiz: (quizId: string) => {
    set(
      produce((state) => {
        state.chosenQuiz = state.quizzes.find(
          (quiz: { id: string }) => quiz.id === quizId
        );
      })
    );
  },

  setUserAnswer: (
    questionId: string,
    optionId: string,
    userAnswer: boolean
  ) => {
    set(
      produce((state) => {
        const updatedAnswerOption = state.chosenQuiz.questions.find(
          (question: { id: string }) => question.id === questionId
        );

        updatedAnswerOption.options.find(
          (option: { id: string }) => option.id === optionId
        ).userAnswer = userAnswer;
      })
    );
  },

  getQuizResult: () => {
    const answeredQuestions = get().chosenQuiz && get()?.chosenQuiz?.questions;

    if (answeredQuestions) {
      for (let i = 0; i < answeredQuestions.length; i++) {
        const correctAnswer = answeredQuestions[i].options.map(
          (o) => o.correct
        );
        const correctUserAnswer = answeredQuestions[i].options.map(
          (o) => o.userAnswer
        );

        if (
          JSON.stringify(correctAnswer) === JSON.stringify(correctUserAnswer)
        ) {
          set(
            produce((state) => {
              state.quizResult.correctAnswers += 1;
            })
          );
        }

        if (
          JSON.stringify(correctAnswer) !== JSON.stringify(correctUserAnswer)
        ) {
          set(
            produce((state) => {
              state.quizResult.wrongAnswers += 1;
            })
          );
        }
      }
    }
  },

  resetChosenQuiz: () => {
    set(
      produce((state) => {
        state.chosenQuiz = undefined;
        state.quizResult = {
          correctAnswers: 0,
          wrongAnswers: 0,
        };
      })
    );
  },
}));
