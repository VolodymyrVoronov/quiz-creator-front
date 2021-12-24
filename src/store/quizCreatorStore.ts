import create from "zustand";
import produce from "immer";

import {
  createNewAnswerOption,
  createNewQuestion,
  createNewQuiz,
} from "helpers/quizCreatorStore";

export interface IAnswerOption {
  id: string;
  answerOption: string;
  correct: boolean;
  userAnswer: boolean;
}

interface IQuestion {
  id: string;
  question: string;
  options: IAnswerOption[];
}

interface IQuiz {
  id: string;
  quizTitle: string;
  questions: IQuestion[];
}

interface IQuizCreatorStore {
  quiz: IQuiz[] | [];
  isLoading: boolean;

  createNewQuiz: () => void;
  saveQuiz: () => void;
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
}

export const quizCreatorStore = create<IQuizCreatorStore>((set, get) => ({
  quiz: [],
  isLoading: false,

  createNewQuiz: () => {
    set(
      produce((state) => {
        const newQuiz = createNewQuiz();

        state.quiz.push(newQuiz);
      })
    );
  },

  saveQuiz: () => {
    const userId = JSON.parse(localStorage.getItem("userData") || "{}").id;
    const createdQuiz = get().quiz[0];

    console.log({ ...createdQuiz, userId });
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

  deleteQuestion: (questionId: string) => {
    set(
      produce((state) => {
        state.quiz[0].questions = state.quiz[0].questions.filter(
          (question: { id: string }) => question.id !== questionId
        );
      })
    );
  },
}));
