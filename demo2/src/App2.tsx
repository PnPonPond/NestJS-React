import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

type App2Props = {
  // using `interface` is also ok
  message?: string;
};

const App2 = (props: App2Props) => {
  const [counter, setCounter] = useState<number>(0);

  const increaseCounter = () => {
    setCounter(counter+1);
  };
  return (
    <div>
      {props.message ? props.message : "Nothing"}
      <br />
      Counter = {counter}
      <br/>
      <button onClick={increaseCounter}>+</button>
    </div>
  );
};

export default App2;
