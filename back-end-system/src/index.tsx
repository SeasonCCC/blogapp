import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import Main from "./pages/main/main";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Main />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
