import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import components
import Layout from "@components/layout/Layout";
import ChatBox from "../ChatBox/ChatBox";
import ChatMenu from "../ChatMenu/ChatMenu";
//import selector
import { roomSelector, loadCurrent } from "@store/user/user.slices";
const ChatPage = () => {
  const userState = useSelector((state) => state.user);
  const rooms = roomSelector.selectAll(userState.rooms);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userState.user !== localStorage.getItem("authToken")) {
      dispatch(loadCurrent());
    }
  }, []);

  return (
    <>
      {userState.loading ? (
        <div>Loading User...</div>
      ) : rooms.length > 0 ? (
        <Layout side={<ChatMenu />} main={<ChatBox />} />
      ) : (
        <Layout main={<div>Nothing here mate</div>} />
      )}
    </>
  );
};

export default ChatPage;
