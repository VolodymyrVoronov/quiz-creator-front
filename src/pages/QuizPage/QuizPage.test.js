import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, HashRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import { quizStore } from "store/quizStore";

import App from "App";
import QuizPage from "./QuizPage";

import mockQuizzesData from "../../data/mockData.ts";

const initialStoreState = quizStore.getState();

afterEach(() => {
  quizStore.setState(initialStoreState);
});

quizStore.setState((initialStoreState.chosenQuiz = mockQuizzesData.quizzes[0]));

test("Testing 'Quiz Creator Page'", () => {
  const div = document.createElement("div");

  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "back-button");
  document.body.appendChild(portalRoot);

  ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
    div
  );

  const history = createMemoryHistory();

  render(
    <MemoryRouter history={history}>
      <QuizPage />
    </MemoryRouter>
  );

  const buttonNextQuestion = screen.getByText(/Next question/i);

  expect(buttonNextQuestion).toBeInTheDocument();
  expect(buttonNextQuestion).toHaveAttribute("disabled");

  userEvent.click(screen.getAllByRole(/checkbox/i)[0]);

  expect(buttonNextQuestion).not.toHaveAttribute("disabled");

  userEvent.click(screen.getAllByRole(/checkbox/i)[0]);

  expect(buttonNextQuestion).toHaveAttribute("disabled");
});
