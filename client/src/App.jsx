import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";

import MainPage from "./views/Main/MainPage";
import MainPage2 from "./views/Main/MainPage/MainPage";
import LogInPage from "./views/LogIn/LogInPage/LogInPage";

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login">
          <LogInPage />
        </Route>
        <PrivateRoute path="/test">
          <MainPage2 />
        </PrivateRoute>
        <PrivateRoute path="/">
          <MainPage />
        </PrivateRoute>
      </Switch>
    </Router>
  </Provider>
);

export default App;
