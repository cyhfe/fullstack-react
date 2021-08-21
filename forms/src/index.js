import React from "react";
import ReactDOM from "react-dom";
import Form from "./form";
const root = document.getElementById("root");
const App = () => {
  return (
    <div className="app">
      <Form />
    </div>
  );
};
ReactDOM.render(<App />, root);
