import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { roomSelector } from "../../../../../store/room/room.slices";
import ConversationBrief from "../ConversationBrief/ConversationBrief.jsx";

import style from "./SideBar.module.css";

const selectAllRooms = (state) => roomSelector.selectAll(state.allRooms);
const selectDMRooms = createSelector(selectAllRooms, (rooms) =>
  rooms.filter((room) => room.isDM)
);
const selectGroupRooms = createSelector(selectAllRooms, (rooms) =>
  rooms.filter((room) => !room.isDM)
);
const selectSavedRooms = createSelector(selectAllRooms, (rooms) =>
  rooms.filter((room) => room.saved)
);

const SideBar = () => {
  const userState = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);

  const [filter, setFilter] = useState("type:dm");
  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {
    if (roomState.populated === true) {
      switch (filter) {
        case "type:dm":
          setDisplayList(selectDMRooms(roomState));
        case "type:group":
          setDisplayList(selectGroupRooms(roomState));
        case "type:saved":
          setDisplayList(selectSavedRooms(roomState));
        default:
          setDisplayList(selectAllRooms(roomState));
      }
    }
  }, [filter, roomState]);

  return (
    <div className={style.slidebar}>
      <div>{userState.username}</div>
      {displayList.map((room) => (
        <ConversationBrief
          id={room._id}
          name={room.name}
          recentMS={room.latestMessage}
          member={room.member}
          isDM={room.isDM}
        />
      ))}
      <div className="sectionList">
        <button>All Message</button>
        <button>Archived</button>
        <button>Saved</button>
      </div>
    </div>
  );
};

export default SideBar;
