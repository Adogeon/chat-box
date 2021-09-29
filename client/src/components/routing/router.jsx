import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import LogInPage from "../../views/LogIn/LogInPage/LogInPage.jsx";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LogInPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default MainRouter;
