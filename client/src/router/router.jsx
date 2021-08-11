import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "../pages/home";
import ChatPage from "../pages/chat";
import SignInPage from "../pages/signin";
import SignUpPage from "../pages/signup";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/chat">
          <ChatPage />
        </Route>
        <Route path="/signin">
          <SignInPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default MainRouter;
