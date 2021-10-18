import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { roomSelector } from "../../../store/room/room.slices";
import ConversationBrief from "../ConversationBrief/ConversationBrief";

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

const ConversationList = () => {
  const roomState = useSelector((state) => state.room);

  const messages = selectDMRooms(roomState);
  const groups = selectGroupRooms(roomState);
  const saved = selectSavedRooms(roomState);

  return (
    <div>
      <div>
        <h3>Save:</h3>
        {saved.map((room) => (
          <ConversationBrief
            id={room._id}
            name={room.name}
            recentMS={room.latestMessage}
            member={room.member}
            isDM={room.isDM}
          />
        ))}
      </div>
      <div>
        <h3>Messages:</h3>
        {messages.map((room) => (
          <ConversationBrief
            id={room._id}
            name={room.name}
            recentMS={room.latestMessage}
            member={room.member}
            isDM={true}
          />
        ))}
      </div>
      <div>
        <h3>Group:</h3>
        {groups.map((room) => (
          <ConversationBrief
            id={room._id}
            name={room.name}
            recentMs={room.latestMessage}
            member={room.member}
            isDm={false}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
