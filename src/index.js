import React from "react";
import ReactDOM from "react-dom";
import Todo from "./Todo"
import "./styles.css";

const todos = [
  { value: 1, text: 111, isChecked: false },
  { value: 2, text: 222, isChecked: true }
];

const App = () => {
  return <Todo todos={todos} />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
