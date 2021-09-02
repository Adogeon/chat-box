import React, { createContext, useContext, useReducer } from "react";

import { BoxReducer, initialState } from "./reducer";

const BoxStateContext = createContext();
const BoxDispatchContext = createContext();

export const useBoxState = () => {
  const context = useContext(BoxStateContext);
  if (context === undefined) {
    throw new Error("useBoxState must be used within a BoxProvider");
  }
  return context;
};

export const useBoxDispatch = () => {
  const context = useContext(BoxDispatchContext);
  if (context === undefined) {
    throw new Error("useBoxDispatch must be used within a BoxProvider");
  }
  return context;
};

export const BoxProvider = (props) => {
  const [box, dispatch] = useReducer(BoxReducer, initialState);

  return (
    <BoxStateContext.Provider value={box}>
      <BoxDispatchContext.Provider value={dispatch}>
        {props.children}
      </BoxDispatchContext.Provider>
    </BoxStateContext.Provider>
  );
};
