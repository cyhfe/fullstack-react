const root = document.getElementById("root");
const App = () => {
  return (
    <div>
      <Switch />
      {/* <Counter initialValue={12} /> */}
    </div>
  );
};

const CREDITCARD = "Creditcard";
const BTC = "Bitcoin";

class Switch extends React.Component {
  state = {
    payMethod: "",
  };
  select = (method) => (e) => {
    this.setState({
      payMethod: method,
    });
  };
  render() {
    return (
      <div className="switch">
        <Choice label={BTC} onClick={this.select(BTC)} />
        <Choice label={CREDITCARD} onClick={this.select(CREDITCARD)} />
        Pay with: {this.state.payMethod}
      </div>
    );
  }
}

const Choice = ({ active, label, onClick }) => {
  const cssClasses = ["choice"];
  if (active) {
    cssClasses.push("active");
  }
  return (
    <div className={cssClasses} onClick={onClick}>
      {label}
    </div>
  );
};

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.initialValue,
    };
  }
  handleIncrement = () => {
    this.setState((prevState) => {
      return {
        counter: prevState.counter + 1,
      };
    });
  };
  handleDecrement = () => {
    this.setState((prevState) => {
      return {
        counter: prevState.counter - 1,
      };
    });
  };
  render() {
    return (
      <div>
        <div>{this.state.counter}</div>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, root);
