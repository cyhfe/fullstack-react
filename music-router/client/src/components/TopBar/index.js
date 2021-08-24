import React from "react";
import client from "../../client";
import { Link } from "react-router-dom";
import styles from "./TopBar.module.css";
import { withRouter } from "react-router";

class TopBar extends React.Component {
  componentDidMount() {
    this.unlisten = this.props.history.listen((location) => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    return (
      <div className={styles.container}>
        <div>Music Albums</div>
        {client.isLoggedIn() ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    );
  }
}

export default withRouter(TopBar);
