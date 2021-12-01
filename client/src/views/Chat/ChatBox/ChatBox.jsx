import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import socketContext from "@services/socketContext";
//import components
import LogArea from "../LogArea/LogArea";
import InputArea from "../InputArea/InputArea";
import {
  Paper,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
//import actions
import { getRoom, updateLog } from "@store/room/room.slices";
import { updateCurrentRoom } from "@store/user/user.slices";
import { openModal } from "@store/app/app.slices";

const ChatPage = (props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);
  const authState = useSelector((state) => state.auth);
  const socket = useContext(socketContext);
  const currentRoomId = useSelector((state) => state.room.currentRoom._id);

  useEffect(() => {
    if (!currentRoomId) {
      const firstRoomId = userState.rooms.ids[0] || "";
      console.log("firstRoom: ", firstRoomId);
      if (firstRoomId !== "") {
        dispatch(getRoom(firstRoomId));
      }
    }
  }, [authState]);

  useEffect(() => {
    socket.emit("room", { room: currentRoomId });
    socket.on("message", ({ newRecord }) => {
      dispatch(updateLog(newRecord));
      dispatch(
        updateCurrentRoom({
          key: "latestMessage",
          value: newRecord,
        })
      );
    });

    return () => {
      socket.once("leave:room");
      socket.off("message");
    };
  }, []);

  return (
    <Card elevation={4} sx={{ width: "100%" }}>
      <CardHeader
        title={roomState.currentRoom.name}
        action={
          <IconButton onClick={() => dispatch(openModal("editConversation"))}>
            <ModeEditIcon />
          </IconButton>
        }
      />
      <CardContent>
        <LogArea log={roomState.roomLog} currentUsername={userState.username} />
      </CardContent>
      <CardActions>
        <InputArea socket={socket} roomId={roomState.currentRoom._id} />
      </CardActions>
    </Card>
  );
};

export default ChatPage;
