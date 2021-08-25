import React from "react";
import store from "./redux";

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }
  render() {
    return <Counter />;
  }
}

const Counter = () => {
  const handleIncrement = () => {
    store.dispatch({
      type: "INCREMENT",
    });
  };
  const handleDecrement = () => {
    store.dispatch({
      type: "DECREMENT",
    });
  };
  return (
    <div>
      <div>{store.getState().count}</div>
      <div>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
      </div>
    </div>
  );
};

export default App;
