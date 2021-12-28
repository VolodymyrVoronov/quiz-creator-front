import create from "zustand";
import produce from "immer";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

import { saveNewQuiz } from "../api/api";

import {
  createNewAnswerOption,
  createNewQuestion,
  createNewQuiz,
} from "helpers/quizCreatorStore";

import Paths from "const/path";

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
  quizTitle: string;
  questions: IQuestion[];
}

interface IQuizCreatorStore {
  quiz: IQuiz[] | [];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  isQuizValid: boolean;

  createNewQuiz: () => void;
  saveQuiz: (navigation: NavigateFunction) => Promise<void>;
  clearQuiz: () => void;

  updateQuizTitle: (data: string, id: string) => void;
  updateQuestionTitle: (data: string, id: string) => void;
  updateAnswerOption: (
    data: string | boolean,
    answerOptionId: string,
    questionId: string
  ) => void;

  deleteAnswerOption: (answerOptionId: string, questionId: string) => void;
  deleteQuestion: (questionId: string) => void;

  addNewAnswerOption: (questionId: string) => void;
  addNewQuestion: (quizId: string) => void;

  checkValidQuiz: (flag: boolean) => void;
}

export const quizCreatorStore = create<IQuizCreatorStore>((set, get) => ({
  quiz: [],
  isLoading: false,
  errorMessage: "",
  successMessage: "",
  isQuizValid: false,

  createNewQuiz: () => {
    set(
      produce((state) => {
        const newQuiz = createNewQuiz();

        state.quiz.push(newQuiz);
      })
    );
  },

  saveQuiz: async (navigation) => {
    set({ successMessage: "", errorMessage: "" });

    const { id: userId, avatar: userAvatar } = JSON.parse(
      localStorage.getItem("userData") || "{}"
    );
    const createdQuiz = get().quiz[0];

    try {
      set({ isLoading: true });

      const response = await saveNewQuiz({
        ...createdQuiz,
        userId,
        userAvatar,
      });

      if (response.status === 201) {
        set({ successMessage: response.data.message });

        const redirectingTimeout = setTimeout(() => {
          navigation(Paths.QuizzesPage);
          get().clearQuiz();
          set({ successMessage: "", errorMessage: "" });
          clearTimeout(redirectingTimeout);
        }, 2500);
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

  clearQuiz: () => {
    set({ quiz: [] });
  },

  updateQuizTitle: (data: string, id: string) => {
    set(
      produce((state) => {
        const updatedQuiz = state.quiz.find(
          (quiz: { id: string }) => quiz.id === id
        );

        updatedQuiz.quizTitle = data;
      })
    );
  },

  updateQuestionTitle: (data: string, id: string) => {
    set(
      produce((state) => {
        const updatedQuestion = state.quiz[0].questions.find(
          (question: { id: string }) => question.id === id
        );

        updatedQuestion.question = data;
      })
    );
  },

  updateAnswerOption: (
    data: string | boolean,
    answerOptionId: string,
    questionId: string
  ) => {
    set(
      produce((state) => {
        const updatedAnswerOption = state.quiz[0].questions.find(
          (question: { id: string }) => question.id === questionId
        );

        if (typeof data === "string") {
          updatedAnswerOption.options.find(
            (option: { id: string }) => option.id === answerOptionId
          ).answerOption = data;
        }

        if (typeof data === "boolean") {
          updatedAnswerOption.options.find(
            (option: { id: string }) => option.id === answerOptionId
          ).correct = data;
        }
      })
    );
  },

  deleteAnswerOption: (answerOptionId: string, questionId: string) => {
    set(
      produce((state) => {
        const deletedAnswerOption = state.quiz[0].questions.find(
          (question: { id: string }) => question.id === questionId
        );

        deletedAnswerOption.options = deletedAnswerOption.options.filter(
          (option: { id: string }) => option.id !== answerOptionId
        );
      })
    );
  },

  deleteQuestion: (questionId: string) => {
    set(
      produce((state) => {
        state.quiz[0].questions = state.quiz[0].questions.filter(
          (question: { id: string }) => question.id !== questionId
        );
      })
    );
  },

  addNewAnswerOption: (questionId: string) => {
    set(
      produce((state) => {
        const newAnswerOption = state.quiz[0].questions.find(
          (question: { id: string }) => question.id === questionId
        );

        newAnswerOption.options.push(createNewAnswerOption());
      })
    );
  },

  addNewQuestion: (quizId: string) => {
    set(
      produce((state) => {
        const updatedQuiz = state.quiz.find(
          (quiz: { id: string }) => quiz.id === quizId
        );

        updatedQuiz.questions.push(createNewQuestion());
      })
    );
  },

  checkValidQuiz: (flag: boolean) => {
    set(
      produce((state) => {
        state.isQuizValid = flag;
      })
    );
  },
}));
