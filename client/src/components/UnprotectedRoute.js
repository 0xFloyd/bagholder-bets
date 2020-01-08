import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  // this is a protected route
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default ProtectedRoute;
