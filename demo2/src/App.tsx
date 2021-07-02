import React from "react";
import logo from "./logo.svg";
import "./App.css";

type AppProps = {
  // using `interface` is also ok
  message?: string;
};
type AppState = {
  counter: number;
};
class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    counter: 0,
  };
  increaseCounter = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  render() {
    return (
      <div>
        {this.props.message ? this.props.message : "Nothing"}
        <br />
        Counter = {this.state.counter}
        <br />
        <button onClick={this.increaseCounter}>Increase</button>
      </div>
    );
  }
}

export default App;
