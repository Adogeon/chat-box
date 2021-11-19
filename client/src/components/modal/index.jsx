import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { closeModal } from "@store/app/app.slices";
import AddContactModalForm from "./AddContact/AddContact";
import EditConversationModalForm from "./EditConversation/EditConversation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const Modal = (props) => {
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  if (appState.modalContent === "addContact") {
    return (
      <Dialog open={appState.showModal} onClose={handleClose} size="md">
        <AddContactModalForm handleClose={handleClose} />
      </Dialog>
    );
  } else if (appState.modalContent === "editConversation") {
    return (
      <Dialog open={appState.showModal} onClose={handleClose}>
        <EditConversationModalForm handleClose={handleClose} />
      </Dialog>
    );
  } else if (appState.modalContent === "newConversation") {
    return (
      <Dialog open={appState.showModal} onClose={handleClose}>
        <EditConversationModalForm new handleClose={handleClose} />
      </Dialog>
    );
  }
  return (
    <Dialog open={appState.showModal} onClose={handleClose}>
      <DialogTitle>Modal</DialogTitle>
      <DialogContent>
        <DialogContentText>This is a modal</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
