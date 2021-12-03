import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import components
import Layout from "@components/layout";
import ChatBox from "../ChatBox/ChatBox";
import ChatMenu from "../ChatMenu/ChatMenu";
//import selector
import { roomSelector, loadCurrent } from "@store/user/user.slices";
import { getRoom } from "@store/room/room.actions";

const ChatPage = () => {
  const appState = useSelector((state) => state.app);
  const userState = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);
  const rooms = roomSelector.selectAll(userState.rooms);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!appState.userLoaded) {
      dispatch(loadCurrent()).then(({ payload }) => {
        if (payload.box.length > 0) {
          const firstRoomId = payload.box[0]._id;
          dispatch(getRoom(firstRoomId));
        }
      });
    }
  }, []);

  return (
    <>
      {userState.loading ? (
        <div>Loading User...</div>
      ) : rooms.length > 0 ? (
        <Layout
          side={<ChatMenu />}
          main={
            roomState.fetchingCurrent ? (
              <div>Loading room ... </div>
            ) : (
              <ChatBox />
            )
          }
        />
      ) : (
        <Layout main={<div>Nothing here mate</div>} />
      )}
    </>
  );
};

export default ChatPage;
