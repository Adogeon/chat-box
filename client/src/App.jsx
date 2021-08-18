import React from "react";

import MainRouter from "./router/router";
import { AuthProvider } from "./contexts/authContext";

const App = () => (
  <AuthProvider>
    <MainRouter />
  </AuthProvider>
);

export default App;
