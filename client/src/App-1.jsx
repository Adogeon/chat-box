import React from "react";

import MainRouter from "./router/router";
import { AuthProvider } from "./contexts/authContext";
import { UserProvider } from "./contexts/userContext";
import { BoxProvider } from "./contexts/boxContext";

const App = () => (
  <AuthProvider>
    <UserProvider>
      <BoxProvider>
        <MainRouter />
      </BoxProvider>
    </UserProvider>
  </AuthProvider>
);

export default App;
