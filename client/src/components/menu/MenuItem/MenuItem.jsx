import React from "react";

import style from "./item.module.css";

const TwoLineItems = (props) => {
  return (
    <li className={style.row}>
      <button
        className={`${style.tab} ${style.twoLine}`}
        onClick={props.onClick}
      >
        <div className={style.photo}>{props.icon}</div>
        <div className={style.detail}>
          <div className={style.top}>{props.primarytext}</div>
          <div className={style.bottom}>{props.subtext}</div>
        </div>
        <div className={style.extra}>{props.extra}</div>
      </button>
    </li>
  );
};

const MenuItem = ({ type, ...restProps }) => {
  if (type === "two-line") {
    return <TwoLineItems {...restProps} />;
  } else {
    return <div>OneLineItem</div>;
  }
};

export default MenuItem;