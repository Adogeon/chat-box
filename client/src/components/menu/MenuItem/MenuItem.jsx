import React from "react";

import style from "./item.module.css";

// implementation of Material UI Menu Item, consult link: https://material.io/components/lists#specs

const OneLineItem = (props) => {
  return (
    <li className={style.row}>
      <button
        className={`${style.tab} ${style.oneLine}`}
        onClick={props.onClick}
      >
        <div className={style.photo}>{props.icon}</div>
        <div className={style.text}>{props.text}</div>
        <div className={style.extra}>{props.extra}</div>
      </button>
    </li>
  );
};

const TwoLineItem = (props) => {
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

import {
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Grid,
} from "@mui/material";

const MenuItem = (props) => (
  <ListItemButton alignItems="flex-start" onClick={props.onClick}>
    <ListItemAvatar>
      <Avatar />
    </ListItemAvatar>
    <ListItemText
      primary={props.primaryText}
      secondary={
        <>
          <Typography
            sx={{ maxWidth: "17em" }}
            variant="body2"
            align="left"
            noWrap
          >
            {props.subtext}
          </Typography>
          <Typography sx={{ display: "inline" }} variant="body2">
            {props.extra}
          </Typography>
        </>
      }
      secondaryTypographyProps={{ component: "div" }}
    />
  </ListItemButton>
);

export default MenuItem;
