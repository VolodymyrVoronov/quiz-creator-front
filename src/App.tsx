import { FC, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Paths from "const/path";
import StartPage from "pages/StartPage/StartPage";

const AuthPage = lazy(
  () => import(/* webpackPrefetch: true */ "pages/AuthPage/AuthPage")
);

const AllQuizzesPage = lazy(
  () =>
    import(/* webpackPrefetch: true */ "pages/AllQuizzesPage/AllQuizzesPage")
);

const App: FC<{}> = (): JSX.Element => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path={Paths.Root} element={<Navigate to={Paths.StartPage} />} />
        <Route path={Paths.StartPage} element={<StartPage />} />
        <Route path={Paths.AuthPage} element={<AuthPage />} />
        <Route path={Paths.AllQuizzesPage} element={<AllQuizzesPage />} />
        <Route path={Paths.NoPage} element={<p>Nothing found.</p>} />
      </Routes>
    </Suspense>
  );
};

export default App;
