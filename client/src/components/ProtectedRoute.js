import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  console.log("PRotected route console.log", isAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
