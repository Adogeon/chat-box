import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadCurrent } from "../../../store/user/user.slices.js";
import { loadAllRoom, roomSelector } from "../../../store/room/room.slices.js";

import ChatBox from "../ChatBox/ChatBox.jsx";
import ConversationList from "../ConversationList/ConversationList.jsx";
import AppBar from "../../../components/navigation/Appbar/Appbar";

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
  const allRoom = roomSelector.selectAll(roomState.allRooms);

  return (
    <>
      {userState.loading ? (
        <div> LoAding User...</div>
      ) : (
        <div className={style.layout}>
          <AppBar className={style.bar} />
          {allRoom.length > 0 ? (
            <>
              <div className={style.nav}>
                <ConversationList />
              </div>
              <div className={style.body}>
                <ChatBox />
              </div>
            </>
          ) : (
            <>
              <div className={style.body}>Nothing here mate</div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MainPage2;
