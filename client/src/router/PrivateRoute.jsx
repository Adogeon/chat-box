import React from "react";
import { BrowserRoute as Route, Redirect } from "react-router-dom";
import { useAuthState } from "../contexts/authContext";

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuthState();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
