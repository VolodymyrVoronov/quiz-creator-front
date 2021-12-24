import create from "zustand";

import {
  createNewAnswerOption,
  createNewQuestion,
  createNewQuiz,
} from "helpers/quizStore";

export interface IOption {
  id: string;
  answerOption: string;
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
  updateQuizTitle: (data: string, id: string) => void;
  updateQuestionTitle: (data: string, id: string) => void;
  updateAnswerOption: (
    data: string | boolean,
    answerOptionId: string,
    questionId: string
  ) => void;
  deleteAnswerOption: (answerOptionId: string, questionId: string) => void;
  addNewAnswerOption: (questionId: string) => void;
  addNewQuestion: (quizId: string) => void;
  deleleteQuestion: (questionId: string) => void;
}

export const quizStore = create<IQuizStore>((set, get) => ({
  quiz: [],
  isLoading: false,

  createNewQuiz: () => {
    set((state) => {
      const newQuiz = createNewQuiz();

      return {
        ...state,
        quiz: [...state.quiz, newQuiz],
      };
    });
  },

  updateQuizTitle: (data: string, id: string) => {
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

  updateQuestionTitle: (data: string, id: string) => {
    set((state) => {
      const updateQuizTitle = state.quiz.map((quiz) => {
        const updatedQuestions = quiz.questions.map((question) => {
          if (question.id === id) {
            return {
              ...question,
              question: data,
            };
          }

          return question;
        });

        return {
          ...quiz,
          questions: updatedQuestions,
        };
      });

      return {
        ...state,
        quiz: updateQuizTitle,
      };
    });
  },

  updateAnswerOption: (
    data: string | boolean,
    answerOptionId: string,
    questionId: string
  ) => {
    set((state) => {
      const updatedQuiz = state.quiz.map((quiz) => {
        const updatedQuestions: IQuestion[] = quiz.questions.map((question) => {
          if (question.id === questionId) {
            const updatedOptions = question.options.map((option) => {
              if (option.id === answerOptionId) {
                if (typeof data === "string") {
                  return {
                    ...option,
                    answerOption: data,
                  };
                }

                if (typeof data === "boolean") {
                  return {
                    ...option,
                    correct: data,
                  };
                }
              }

              return option;
            });

            return {
              ...question,
              options: updatedOptions,
            };
          }

          return question;
        });

        return {
          ...quiz,
          questions: updatedQuestions,
        };
      });

      return {
        ...state,
        quiz: updatedQuiz,
      };
    });
  },

  addNewAnswerOption: (questionId: string) => {
    set((state) => {
      const updatedQuiz = state.quiz.map((quiz) => {
        const updatedQuestions = quiz.questions.map((question) => {
          if (question.id === questionId) {
            const newOption: IOption = createNewAnswerOption();

            return {
              ...question,
              options: [...question.options, newOption],
            };
          }

          return question;
        });

        return {
          ...quiz,
          questions: updatedQuestions,
        };
      });

      return {
        ...state,
        quiz: updatedQuiz,
      };
    });
  },

  deleteAnswerOption: (answerOptionId: string, questionId: string) => {
    set((state) => {
      const updatedQuiz = state.quiz.map((quiz) => {
        const updatedQuestions = quiz.questions.map((question) => {
          if (question.id === questionId) {
            const updatedOptions = question.options.filter(
              (option) => option.id !== answerOptionId
            );

            return {
              ...question,
              options: updatedOptions,
            };
          }

          return question;
        });

        return {
          ...quiz,
          questions: updatedQuestions,
        };
      });

      return {
        ...state,
        quiz: updatedQuiz,
      };
    });
  },

  addNewQuestion: (quizId: string) => {
    set((state) => {
      const updatedQuiz = state.quiz.map((quiz) => {
        if (quiz.id === quizId) {
          const newQuestion: IQuestion = createNewQuestion();

          return {
            ...quiz,
            questions: [...quiz.questions, newQuestion],
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

  deleleteQuestion: (questionId: string) => {
    console.log(questionId, questionId);

    set((state) => {
      const updatedQuiz = state.quiz.map((quiz) => {
        const updatedQuestions = quiz.questions.filter(
          (question) => question.id !== questionId
        );

        return {
          ...quiz,
          questions: updatedQuestions,
        };
      });
      return {
        ...state,
        quiz: updatedQuiz,
      };
    });
  },
}));
