import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";

import ChatPage from "./views/Chat/ChatPage/ChatPage";
import HomePage from "./views/Home/HomePage/HomePage";
import LogInPage from "./views/LogIn/LogInPage/LogInPage";

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <PrivateRoute path="/chat/:boxId">
          <ChatPage />
        </PrivateRoute>
        <PrivateRoute path="/home">
          <HomePage />
        </PrivateRoute>
        <Route path="/login">
          <LogInPage />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;
