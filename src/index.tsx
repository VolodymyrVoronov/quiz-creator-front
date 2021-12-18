import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider as BumbagProvider } from "bumbag";

import App from "App";

import theme from "theme/theme";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <BumbagProvider theme={theme}>
        <App />
      </BumbagProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
