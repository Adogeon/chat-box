import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/home";
import ChatPage from "./pages/chat";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chat">
          <ChatPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
