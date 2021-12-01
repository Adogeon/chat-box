import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import store, context
import store from "./store";
import SocketContext, { socket } from "@services/socketContext";
//import views
import PrivateRoute from "./components/routing/PrivateRoute";
import LogInPage from "./views/LogIn/LogInPage/LogInPage";
import ChatPage from "./views/Chat/ChatPage/ChatPage";
import ContactPage from "./views/Contact";

const App = () => (
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <Router>
        <Switch>
          <Route path="/login">
            <LogInPage />
          </Route>
          <PrivateRoute path="/contact">
            <ContactPage />
          </PrivateRoute>
          <PrivateRoute path="/">
            <ChatPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </SocketContext.Provider>
  </Provider>
);

export default App;
