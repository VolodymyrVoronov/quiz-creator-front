import { FC, Suspense, lazy, useEffect, Fragment } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { ToastManager, useToasts } from "bumbag";

import { authStore } from "store/authStore";

import Paths from "const/path";

import { checkIfObjectEmpty } from "helpers/checkIfObjectEmpty";

import StartPage from "pages/StartPage/StartPage";
import Loader from "components/common/Loader/Loader";
import UserBlock from "components/UserBlock/UserBlock";

const AuthPage = lazy(
  () => import(/* webpackPrefetch: true */ "pages/AuthPage/AuthPage")
);

const AllQuizzesPage = lazy(
  () =>
    import(/* webpackPrefetch: true */ "pages/AllQuizzesPage/AllQuizzesPage")
);

const AuthFormPage = lazy(
  () => import(/* webpackPrefetch: true */ "pages/AuthFormPage/AuthFormPage")
);

const QuizCreatorPage = lazy(
  () =>
    import(/* webpackPrefetch: true */ "pages/QuizCreatorPage/QuizCreatorPage")
);

const App: FC<{}> = (): JSX.Element => {
  const toasts = useToasts();
  const navigation = useNavigate();
  const { setUserData, userData } = authStore();

  const userDataLS = JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    if (!checkIfObjectEmpty(userDataLS)) {
      const token = userDataLS?.token;

      if (token) {
        const decodedToken: { exp: number } = decode(token);

        if (decodedToken.exp * 1000 < new Date().getTime()) {
          localStorage.removeItem("userData");

          toasts.danger({
            title: "Token has been expired.",
            message: "Please sign in again.",
            duration: 10000,
          });

          navigation(Paths.AuthPage);
        } else {
          setUserData(userDataLS);
        }
      }
    }
  }, []);

  const isUserLogged = !checkIfObjectEmpty(userData);

  console.log(userData);
  return (
    <Fragment>
      <ToastManager />
      {isUserLogged ? <UserBlock /> : null}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path={Paths.Root}
            element={<Navigate to={Paths.StartPage} />}
          />
          <Route path={Paths.StartPage} element={<StartPage />} />
          <Route path={Paths.AuthPage} element={<AuthPage />} />
          <Route path={Paths.AuthFormPage} element={<AuthFormPage />} />
          <Route path={Paths.AllQuizzesPage} element={<AllQuizzesPage />} />

          {isUserLogged ? (
            <Route path={Paths.QuizCreator} element={<QuizCreatorPage />} />
          ) : null}

          <Route path={Paths.NoPage} element={<p>Nothing found.</p>} />
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default App;
