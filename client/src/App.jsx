import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";

import LogInPage from "./views/LogIn/LogInPage/LogInPage";
import ChatPage from "./views/Chat/ChatPage/ChatPage";

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login">
          <LogInPage />
        </Route>
        <PrivateRoute path="/">
          <ChatPage />
        </PrivateRoute>
      </Switch>
    </Router>
  </Provider>
);

export default App;
