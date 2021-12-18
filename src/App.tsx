import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Paths from "const/path";
import StartPage from "pages/StartPage/StartPage";

const App: FC<{}> = (): JSX.Element => {
  return (
    <Routes>
      <Route path={Paths.Root} element={<Navigate to={Paths.StartPage} />} />
      <Route path={Paths.StartPage} element={<StartPage />} />
      <Route path={Paths.NoPage} element={<p>Nothing found.</p>} />
    </Routes>
  );
};

export default App;
