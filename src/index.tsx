import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import Main from "PAGE/main";
import "../index.html";

ReactDOM.render(
  <HashRouter>
    <Main />
  </HashRouter>,
  document.getElementById("root")
);
