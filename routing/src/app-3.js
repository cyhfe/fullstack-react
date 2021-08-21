import React, { createContext } from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const RouterContext = createContext();
const LocationContext = createContext();

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div className="nav">
            {/* <Link to="/">home</Link> */}
            <Link to="/user">user</Link>
            <Link to="/about">about</Link>
            <Link to="/redirect">redirect</Link>
          </div>
          {/* <Route path="/" component={Home} /> */}
          <Route path="/user" component={User} />
          <Route path="/about" component={About} />
          <Route path="/redirect">
            <Redirect to="/user" />
          </Route>
        </div>
      </Router>
    );
  }
}

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.history = history;
    this.history.listen((location, action) => {
      this.forceUpdate();
    });
  }
  render() {
    return (
      <RouterContext.Provider
        value={{
          history,
          location: history.location,
        }}
      >
        <LocationContext.Provider value={history.location}>
          {this.props.children}
        </LocationContext.Provider>
      </RouterContext.Provider>
    );
  }
}

const Route = ({ path, component, children }) => {
  return (
    <LocationContext.Consumer>
      {(location) => {
        if (path.match(location.pathname)) {
          return component ? React.createElement(component) : children;
        } else {
          return null;
        }
      }}
    </LocationContext.Consumer>
  );
};

class Link extends React.Component {
  handleClick = (e, history) => {
    e.preventDefault();
    history.push(this.props.to);
  };
  render() {
    return (
      <RouterContext.Consumer>
        {({ history }) => {
          return (
            <a
              href={this.props.to}
              onClick={(e) => this.handleClick(e, history)}
            >
              {this.props.children}
            </a>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

class Redirect extends React.Component {
  static contextType = RouterContext;
  componentDidMount() {
    const history = this.context.history;
    history.push(this.props.to);
  }
  render() {
    return null;
  }
}

// const Home = () => {
//   return <div>home</div>;
// };

const User = () => {
  return <div>User</div>;
};

const About = () => {
  return <div>about</div>;
};

export default App;
