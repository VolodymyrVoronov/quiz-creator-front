import * as React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MemoryRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import { createMemoryHistory } from "history";

import App from "../../App";
import StartPage from "./StartPage";
import UserBlock from "components/UserBlock/UserBlock";
import AuthPage from "pages/AuthPage/AuthPage";
import Loader from "components/common/Loader/Loader";

test("two buttons should be rendered", () => {
  const history = createMemoryHistory();

  history.push = jest.fn();

  render(
    <MemoryRouter history={history}>
      <StartPage />
    </MemoryRouter>
  );

  const createNewQuizButton = screen.getByRole("button", {
    name: /Create new quiz/i,
  });
  const allQuizzesButton = screen.getByRole("button", { name: /All quizzes/i });

  expect(createNewQuizButton).toBeInTheDocument();
  expect(allQuizzesButton).toBeInTheDocument();
});

test("if no user logged in, the user block shouldn't be on screen", () => {
  const history = createMemoryHistory();

  history.push = jest.fn();

  const user = localStorage.getItem("user");

  expect(user).toBeNull();

  render(
    <MemoryRouter history={history}>{user && <UserBlock />}</MemoryRouter>
  );

  const userBlock = screen.queryByRole("button", { name: /Log out/i });

  expect(userBlock).toBeNull();
});

test("if user logged in, the user block should be on screen", () => {
  const history = createMemoryHistory();

  history.push = jest.fn();

  const userData = {
    avatar: "avatar",
    id: "string",
    email: "email",
    token: "token",
  };

  localStorage.setItem("user", JSON.stringify(userData));

  const user = localStorage.getItem("user");

  expect(user).not.toBeNull();

  render(
    <MemoryRouter history={history}>{user && <UserBlock />}</MemoryRouter>
  );

  const userBlock = screen.queryByRole("button", { name: /Log out/i });

  expect(userBlock).toBeInTheDocument();
});

test("click on crate new quiz button leads to auth page, if no user logged in", async () => {
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

  localStorage.clear();

  const history = createMemoryHistory();

  history.push = jest.fn();

  render(
    <React.Suspense fallback={<Loader />}>
      <MemoryRouter history={history} initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Navigate to="/start" />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/authentication" element={<AuthPage />} />
        </Routes>
      </MemoryRouter>
    </React.Suspense>
  );

  const createNewQuizButton = screen.getByRole("button", {
    name: /Create new quiz/i,
  });

  userEvent.click(createNewQuizButton);

  const user = localStorage.getItem("user");

  expect(user).toBeNull();

  history.replace("/authentication");

  expect(history.location.pathname).toBe("/authentication");

  const singInButton = screen.getByRole("button", {
    name: /Sign in/i,
  });
  const signUpButton = screen.getByRole("button", { name: /Sign up/i });

  expect(singInButton).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});
