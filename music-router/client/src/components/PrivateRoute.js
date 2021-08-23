import client from "../client";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      client.isLoggedIn() ? (
        React.createElement(component, props)
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
