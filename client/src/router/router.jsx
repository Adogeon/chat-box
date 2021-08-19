import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import ChatPage from "../pages/chat";
import SignInPage from "../pages/signin";
import SignUpPage from "../pages/signup";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/chat">
          <ChatPage />
        </PrivateRoute>
        <Route path="/signin">
          <SignInPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        
      </Switch>
    </Router>
  );
};

export default MainRouter;
