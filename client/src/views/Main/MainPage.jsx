import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { loadCurrent } from "../../store/user/user.slices.js";
import { loadAllRoom, roomSelector } from "../../store/room/room.slices.js";

import ChatPage from "../Chat/ChatPage/ChatPage.jsx";
import SideBar from "../../components/navigation/Sidebar/SideBar.jsx";

import style from "./main.module.css"

const MainPage = () => {
  const userState = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCurrent()).then((result) => {
      dispatch(loadAllRoom(result.payload.box));
    });
  }, []);

  let { path, url } = useRouteMatch();
  console.log("path", path);
  console.log("url", url);
  if (roomState.populated === true) {
    const allRoom = roomSelector.selectAll(roomState.allRooms);
    console.log("all", allRoom);

    const roomEntities = roomSelector.selectEntities(roomState.allRooms);
    console.log("entities", roomEntities);
  }

  return (
    <>
      {userState.loading ? (
        <div> LoAding User...</div>
      ) : (
        <div className={style.layout}>
          <SideBar />
          <Switch>
            <Route path={`/chat/:roomId`}>
              <ChatPage />
            </Route>
            <Route exact path={`${path}`}>
              <div> Welcome user</div>
            </Route>
            <Route>
              <div>No match</div>
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
};

export default MainPage;
