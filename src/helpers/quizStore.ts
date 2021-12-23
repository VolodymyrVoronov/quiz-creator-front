import uniqid from "uniqid";

const createNewAnswerOption = () => {
  return {
    id: uniqid(),
    answerOption: "Option",
    correct: false,
    userAnswer: false,
  };
};

const createNewQuestion = () => {
  return {
    id: uniqid(),
    question: "Question",
    options: [createNewAnswerOption(), createNewAnswerOption()],
  };
};

const createNewQuiz = () => {
  return {
    id: uniqid(),
    quizTitle: "Quiz title",
    questions: [createNewQuestion()],
  };
};

export { createNewAnswerOption, createNewQuestion, createNewQuiz };
