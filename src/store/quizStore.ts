import create from "zustand";
import uniqid from "uniqid";

interface IOption {
  id: string;
  optionTest: string;
  correct: boolean;
  userAnswer: boolean;
}

interface IQuestion {
  id: string;
  question: string;
  options: IOption[];
}

interface IQuiz {
  id: string;
  quizTitle: string;
  questions: IQuestion[];
}

interface IQuizStore {
  quiz: IQuiz[];
  isLoading: boolean;
  createNewQuiz: () => void;
  updatedQuiz: (data: string, id: string) => void;
}

export const quizStore = create<IQuizStore>((set, get) => ({
  quiz: [],
  isLoading: false,

  createNewQuiz: () => {
    set((state) => {
      const newQuiz = {
        id: uniqid(),
        quizTitle: "Quiz title",
        questions: [
          {
            id: uniqid(),
            question: "Question",
            options: [
              {
                id: uniqid(),
                optionTest: "Option 1",
                correct: false,
                userAnswer: false,
              },
              {
                id: uniqid(),
                optionTest: "Option 2",
                correct: false,
                userAnswer: false,
              },
            ],
          },
        ],
      };

      return {
        ...state,
        quiz: [...state.quiz, newQuiz],
      };
    });
  },

  updatedQuiz: (data: string, id: string) => {
    set((state) => {
      const updatedQuiz = state.quiz.map((quiz) => {
        if (quiz.id === id) {
          return {
            ...quiz,
            quizTitle: data,
          };
        }

        return quiz;
      });

      return {
        ...state,
        quiz: updatedQuiz,
      };
    });
  },
}));
