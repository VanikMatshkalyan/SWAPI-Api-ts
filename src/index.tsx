import React from "react";
import ReactDOM from "react-dom";
import About from "./components/About/About";
import Menu from "./components/Menu/Menu";
import "./index.css";

const App = (): React.ReactElement => {
  return (
    <div>
      <Menu />
      <About />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
