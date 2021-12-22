import create from "zustand";

interface IQuiz {}

export const quizzesStore = create<IQuiz>((set, get) => ({
  quizzes: [],
  isLoading: false,
}));
