import React from "react";
import { useDispatch, useSelector } from "react-redux";
//import action
import { getRoom } from "../../../store/room/room.slices";
import { roomSelector } from "../../../store/user/user.slices";
//import components
import { MenuItem, MenuList } from "../../../components/menu";

import dateParser from "../../../adapters/dateParser";

const selectAllRooms = (state) => roomSelector.selectAll(state.rooms);
const generateRoomLabel = (room, currentUserId) => {
  return room.name === null
    ? room.member.filter((person) => person._id !== currentUserId).join("")
    : room.name;
};

const ChatMenu = () => {
  const userState = useSelector((state) => state.user);
  const rooms = selectAllRooms(userState);
  const currentUserId = userState.userId;

  const dispatch = useDispatch();
  const handleItemClick = (id) => {
    dispatch(getRoom(id));
  };

  return (
    <MenuList>
      {rooms.map((room) => (
        <MenuItem
          type={"two-line"}
          key={room._id}
          primarytext={generateRoomLabel(room, currentUserId)}
          subtext={room.latestMessage.body}
          extra={dateParser(room.latestMessage.date)}
          onClick={() => {
            handleItemClick(room._id);
          }}
        />
      ))}
    </MenuList>
  );
};

export default ChatMenu;
