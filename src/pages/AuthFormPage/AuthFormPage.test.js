import * as React from "react";
import ReactDOM from "react-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, HashRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import { authStore } from "store/authStore";

import App from "../../App";
import AuthFormPage from "./AuthFormPage";

const buildSignInForm = () => {
  return {
    avatar: "avatar string",
    email: "test@mail.com",
    password: "123456",
    confirmPassword: "123456",
  };
};

const initialStoreState = authStore.getState();

afterEach(() => {
  authStore.setState(initialStoreState);
});

authStore.setState((initialStoreState.isSignInForm = true));

test("testing sign in form.", () => {
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
      <AuthFormPage />
    </MemoryRouter>
  );

  const cancelButton = screen.getByLabelText(/Clear all fields/i);
  expect(cancelButton).toHaveAttribute("disabled");

  const signInButton = screen.getByLabelText(/Sign In/i);
  expect(signInButton).toHaveAttribute("disabled");

  const { email, password } = buildSignInForm();

  userEvent.type(screen.getByLabelText(/email/i), email);
  userEvent.type(screen.getByLabelText(/password/i), password);

  expect(cancelButton).not.toHaveAttribute("disabled");
  expect(signInButton).not.toHaveAttribute("disabled");

  userEvent.click(cancelButton);

  expect(screen.queryByLabelText(/email/i)).toHaveValue("");
  expect(screen.queryByLabelText(/password/i)).toHaveValue("");
});

authStore.setState((initialStoreState.isSignInForm = false));

test("testing sign up form.", () => {
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
      <AuthFormPage />
    </MemoryRouter>
  );

  const avatarBlock = screen.getByTestId("test-avatar");
  expect(avatarBlock).toBeInTheDocument();

  const cancelButton = screen.getByLabelText(/Clear all fields/i);
  expect(cancelButton).toHaveAttribute("disabled");

  const signInButton = screen.getByLabelText(/Sign Up/i);
  expect(signInButton).toHaveAttribute("disabled");

  const { email, password, confirmPassword } = buildSignInForm();

  const avatars = screen.getAllByRole("img");
  expect(avatars).toHaveLength(10);
  fireEvent.click(avatars[0]);

  expect(avatarBlock).not.toBeInTheDocument();

  const chosenUserAvatar = screen.getByRole("img", { name: /User Avatar/i });

  expect(chosenUserAvatar).toBeInTheDocument();
  userEvent.type(screen.getByLabelText(/email/i), email);
  userEvent.type(screen.getByLabelText("Password field"), password);
  userEvent.type(
    screen.getByLabelText("Confirm password field"),
    confirmPassword
  );

  expect(cancelButton).not.toHaveAttribute("disabled");
  expect(signInButton).not.toHaveAttribute("disabled");

  userEvent.click(cancelButton);

  expect(chosenUserAvatar).not.toBeInTheDocument();

  const avatarBlockAfterClearing = screen.getByTestId("test-avatar");
  expect(avatarBlockAfterClearing).toBeInTheDocument();

  expect(screen.queryByLabelText(/email/i)).toHaveValue("");
  expect(screen.queryByLabelText("Password field")).toHaveValue("");
  expect(screen.queryByLabelText("Confirm password field")).toHaveValue("");
});
