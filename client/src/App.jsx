import React from "react";

import MainRouter from "./router/router";
import { AuthProvider } from "./contexts/authContext";
import { UserProvider } from "./contexts/userContext";

const App = () => (
  <AuthProvider>
    <UserProvider>
      <MainRouter />
    </UserProvider>
  </AuthProvider>
);

export default App;
