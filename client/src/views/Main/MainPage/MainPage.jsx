import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadCurrent } from "../../../store/user/user.slices.js";
import { loadAllRoom, roomSelector } from "../../../store/room/room.slices.js";

import ChatBox from "../ChatBox/ChatBox.jsx";
import ConversationList from "../ConversationList/ConversationList.jsx";

import style from "./main.module.css";

const MainPage2 = () => {
  const userState = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCurrent()).then((result) => {
      dispatch(loadAllRoom(result.payload.box));
    });
  }, []);

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
          <div className={style.nav}>
            <ConversationList />
          </div>
          <div className={style.body}>
            <ChatBox />
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage2;