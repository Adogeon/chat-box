import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//import components
import { MenuItem, MenuList } from "@components/menu";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
//import action
import { getRoom } from "@store/room/room.slices";
import { roomSelector } from "@store/user/user.slices";
import { toggleMobileSideBar, openModal } from "@store/app/app.slices";
//import service
import dateParser from "@services/dateParser";

const selectAllRooms = (state) => roomSelector.selectAll(state.rooms);
const generateRoomLabel = (room, currentUserId) => {
  return room.name === null
    ? room.member.filter((person) => person._id !== currentUserId).join("")
    : room.name;
};

const Sidebar = (props) => {
  const userState = useSelector((state) => state.user);
  const rooms = selectAllRooms(userState);
  const currentUserId = userState.userId;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleContactClick = () => {
    history.push("/contact");
    dispatch(toggleMobileSideBar(false));
  };
  const handleItemClick = (id) => {
    dispatch(getRoom(id));
    history.push("/");
    dispatch(toggleMobileSideBar(false));
  };
  const handleToggleSidebar = () => {
    dispatch(toggleMobileSideBar());
  };
  const handleNewConversation = () => {
    dispatch(openModal("newConversation"));
    dispatch(toggleMobileSideBar(false));
  };

  return (
    <MenuList>
      <Toolbar
        sx={{
          display: { xs: "flex", lg: "none" },
        }}
      >
        <ListItemIcon
          onClick={handleToggleSidebar}
          data-testid="mobile-menu-toggle-side"
        >
          <MenuIcon />
        </ListItemIcon>
        <Typography variant="h6" to="/" sx={{ flexGrow: 1 }}>
          Chat-Box
        </Typography>
      </Toolbar>
      <ListItemButton onClick={handleContactClick}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText>Contacts</ListItemText>
      </ListItemButton>
      <ListItemButton
        onClick={handleNewConversation}
        data-testid="create-room-button"
      >
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>Create a room</ListItemText>
      </ListItemButton>

      <Divider />
      {rooms.map((room) => (
        <MenuItem
          type={"two-line"}
          key={room._id}
          primaryText={generateRoomLabel(room, currentUserId)}
          subtext={room.latestMessage ? room.latestMessage.body : ""}
          extra={
            room.latestMessage ? dateParser(room.latestMessage.date) : "new"
          }
          onClick={() => {
            handleItemClick(room._id);
          }}
        />
      ))}
    </MenuList>
  );
};

export default Sidebar;
