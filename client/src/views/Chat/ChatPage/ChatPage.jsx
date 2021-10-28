import React from "react";
import { useSelector } from "react-redux";
//import components
import Layout from "../../../components/layout/Layout";
import ChatBox from "../ChatBox/ChatBox";
import ChatMenu from "../ChatMenu/ChatMenu";
//import selector
import { roomSelector } from "../../../store/user/user.slices";
const ChatPage = () => {
  const userState = useSelector((state) => state.user);
  const rooms = roomSelector.selectAll(userState.rooms);
  return (
    <>
      {userState.loading ? (
        <div>Laoding User...</div>
      ) : rooms.length > 0 ? (
        <Layout side={<ChatMenu />} main={<ChatBox />} />
      ) : (
        <Layout main={<div>Nothing here mate</div>} />
      )}
    </>
  );
};

export default ChatPage;
