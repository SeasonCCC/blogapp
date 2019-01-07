import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import Login from "./pages/login/login";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Login />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
