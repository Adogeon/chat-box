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
  <ListItemButton alignItem="flex-start" onClick={props.onClick}>
    <ListItemAvatar>
      <Avatar />
    </ListItemAvatar>
    <ListItemText
      primary={props.primaryText}
      secondary={
        <Grid container direction="column" alignItems="flex-start">
          <Grid item flexGrow={1}>
            <Typography
              sx={{ maxWidth: "17em" }}
              component="div"
              variant="body2"
              align="left"
              noWrap
            >
              {props.subtext}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{ display: "inline" }}
              component="div"
              variant="body2"
            >
              {props.extra}
            </Typography>
          </Grid>
        </Grid>
      }
    />
  </ListItemButton>
);

export default MenuItem;
