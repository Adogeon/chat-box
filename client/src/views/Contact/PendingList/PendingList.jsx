import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import components
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
//import actions
/*import {
  approveFriendRequest,
  deleteFriendRequest,
  populateFriendRequest,
} from "@store/user/user.slices";
*/
const PendingList = () => {
  const pendingState = useSelector((state) => state.user.pending);
  const dispatch = useDispatch();

  useEffect(() => {
    // populating pendingState, whenever this component is mounted
    //dispatch(populatePendingUser());
    console.log("populatePendingUser");
  }, []);

  const handleDelete = (requestId) => {
    //    dispatch(approveFriendRequest(requestId));
    console.log("delete request id", requestId);
  };
  const handleApprove = (requestId) => {
    //    dispatch(deleteFriendRequest(requestId));
    console.log("approve requestid", requestId);
  };

  return (
    <List>
      {pendingState.map((request) => (
        <ListItem
          secondaryAction={
            <Box>
              <IconButton
                onClick={() => handleDelete(request._id)}
                variant="danger"
              >
                <ClearIcon />
              </IconButton>
              <IconButton
                onClick={() => handleApprove(request._id)}
                variant="success"
              >
                <CheckIcon />
              </IconButton>
            </Box>
          }
        >
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={"username"} />
        </ListItem>
      ))}
    </List>
  );
};

export default PendingList;
