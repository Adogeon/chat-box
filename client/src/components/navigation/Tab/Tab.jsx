import React from "react";

import button from "../../../styles/Button/button.module.css";

const Tab = ({ active, children, activeClass, defaultClass, ...rest }) => {
  return (
    <button
      className={
        active
          ? `${button.text} ${activeClass}`
          : `${button.text} ${defaultClass}`
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default Tab;
