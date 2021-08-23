import React from "react";
import TopBar from "./components/TopBar/index";
import AlbumsContainer from "./components/AlbumsContainer/index";
import PrivateRoute from "./components/PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import client from "./client";
const App = () => {
  return (
    <Router>
      <div className="app">
        <TopBar />
        <Switch>
          <PrivateRoute path="/albums" component={AlbumsContainer} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact>
            <Redirect to="/albums" />
          </Route>
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
};

const NoMatch = ({ location }) => {
  return <div>{location.pathname} 404 no match</div>;
};

class Login extends React.Component {
  state = {
    loading: false,
    shouldDirect: false,
  };
  handleLoginClick = () => {
    this.loading = true;
    client.login().then(() => {
      this.setState({
        shouldDirect: true,
      });
    });
  };
  render() {
    if (this.state.shouldDirect) {
      return <Redirect to="/albums" />;
    } else {
      return <div onClick={this.handleLoginClick}>login</div>;
    }
  }
}

class Logout extends React.Component {
  constructor(props) {
    super(props);
    client.logout();
  }
  render() {
    return <Redirect to="/login" />;
  }
}

export default App;
