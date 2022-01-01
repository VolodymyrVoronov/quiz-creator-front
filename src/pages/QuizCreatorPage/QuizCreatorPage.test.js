import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, HashRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import App from "App";
import QuizCreatorPage from "./QuizCreatorPage";

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
      <QuizCreatorPage />
    </MemoryRouter>
  );

  const buttonCreateNewQuiz = screen.getByText(/Create new quiz/i);

  expect(buttonCreateNewQuiz).toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: /Create new quiz/i }));

  expect(buttonCreateNewQuiz).not.toBeInTheDocument();

  const buttonAddNewQuestion = screen.getByText(/Add new question/i);
  const buttonSaveQuiz = screen.getByText(/Save quiz/i);

  expect(buttonAddNewQuestion).toBeInTheDocument();
  expect(buttonSaveQuiz).toBeInTheDocument();
  expect(buttonSaveQuiz).toHaveAttribute("disabled");

  const warningMessage = screen.getByText(
    /At least one option should be correct/i
  );

  userEvent.click(screen.getAllByRole("Incorrect")[0]);

  expect(buttonSaveQuiz).not.toHaveAttribute("disabled");

  expect(warningMessage).not.toBeInTheDocument();

  userEvent.click(screen.getAllByRole("Correct")[0]);

  expect(buttonSaveQuiz).toHaveAttribute("disabled");

  userEvent.click(screen.getAllByRole("Incorrect")[0]);

  userEvent.click(
    screen.getByRole("button", { name: /Add new answer option/i })
  );

  const correctCheckBoxes = screen.getAllByRole("Correct");
  const incorrectCheckBoxes = screen.getAllByRole("Incorrect");

  expect(correctCheckBoxes).toHaveLength(1);
  expect(incorrectCheckBoxes).toHaveLength(2);

  userEvent.click(screen.getAllByRole("Correct")[0]);

  expect(
    screen.getByText(/At least one option should be correct/i)
  ).toBeInTheDocument();

  userEvent.click(screen.getAllByRole("button", { name: /Edit/i })[0]);

  const buttonSave = screen.getAllByRole("button", {
    name: /Save/i,
  })[0];

  const buttonCancel = screen.getAllByRole("button", {
    name: /Cancel/i,
  })[0];

  const buttonClear = screen.getAllByRole("button", {
    name: /Clear/i,
  })[0];

  expect(buttonSave).toBeInTheDocument();
  expect(buttonCancel).toBeInTheDocument();
  expect(buttonClear).toBeInTheDocument();

  userEvent.click(screen.getAllByRole("button", { name: /Cancel/i })[0]);

  expect(buttonSave).not.toBeInTheDocument();
  expect(buttonCancel).not.toBeInTheDocument();
  expect(buttonClear).not.toBeInTheDocument();

  userEvent.click(screen.getAllByRole("button", { name: /Delete/i })[0]);

  expect(buttonSaveQuiz).toHaveAttribute("disabled");

  expect(incorrectCheckBoxes).toHaveLength(2);
});
