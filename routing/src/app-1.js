import React from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class App extends React.Component {
  componentDidMount() {
    history.listen((location, action) => {
      this.forceUpdate();
    });
  }
  render() {
    return (
      <div>
        <div className="nav">
          <Link to="home">home</Link>
          <Link to="about">about</Link>
        </div>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

const Route = ({ path, component }) => {
  const pathname = window.location.pathname;
  if (path.match(pathname)) {
    return React.createElement(component);
  } else {
    return null;
  }
};

class Link extends React.Component {
  componentDidMount() {
    history.listen((location, action) => {
      this.forceUpdate();
    });
  }
  handleClick = (e) => {
    e.preventDefault();
    history.push(this.props.to);
  };
  render() {
    return (
      <a href={this.props.to} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

const Home = () => {
  return <div>home</div>;
};

const About = () => {
  return <div>about</div>;
};

export default App;
