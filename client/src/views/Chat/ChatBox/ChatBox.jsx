import React, { useState, useEffect } from "react";

import style from "./chatbox.module.css";
import socket from "@services/socket";
import { useSelector, useDispatch } from "react-redux";
import { getRoom, updateLog } from "@store/room/room.slices";
import LogArea from "../LogArea/LogArea";
import InputArea from "../InputArea/InputArea";
import { updateCurrentRoom } from "@store/user/user.slices";
import { openModal } from "@store/app/app.slices";

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

const ChatPage = (props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);
  const authState = useSelector((state) => state.auth);
  const [count, setCount] = useState(0);

  const currentRoomId = useSelector((state) => state.room.currentRoom._id);

  useEffect(() => {
    console.log(currentRoomId);
    if (!currentRoomId) {
      const firstRoomId = userState.rooms.ids[0] || "";
      console.log("firstRoom: ", firstRoomId);
      if (firstRoomId !== "") {
        dispatch(getRoom(firstRoomId));
      }
    }
  }, [authState]);

  useEffect(() => {
    console.log(count);
    console.log(currentRoomId);
    if (currentRoomId !== "") {
      socket.emit("room", { room: currentRoomId });
      setCount(count + 1);
    }
  }, [currentRoomId]);

  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.on("message", ({ newRecord }) => {
      dispatch(updateLog(newRecord));
      dispatch(
        updateCurrentRoom({
          key: "latestMessage",
          value: newRecord,
        })
      );
    });
  }, []);

  return (
    <Card elevation={4}>
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
