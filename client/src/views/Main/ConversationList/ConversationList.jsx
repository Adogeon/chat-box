import React from "react";
import { useSelector } from "react-redux";

import { roomSelector } from "../../../store/room/room.slices";
import ConversationBrief from "../ConversationBrief/ConversationBrief";

import style from "./converList.module.css";

const selectAllRooms = (state) => roomSelector.selectAll(state.allRooms);

const ConversationList = () => {
  const roomState = useSelector((state) => state.room);

  const rooms = selectAllRooms(roomState);

  return (
    <ul className={style.list}>
      {rooms.map((room) => (
        <li className={style.row}>
          <ConversationBrief
            id={room._id}
            name={room.name}
            recentMS={room.latestMessage}
            member={room.member}
          />
        </li>
      ))}
    </ul>
  );
};

export default ConversationList;
