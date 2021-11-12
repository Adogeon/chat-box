import React, { useState } from "react";
import { useSelector } from "react-redux";
//import component
import { Form, TextInput } from "@components/form";
//import service
import { postWithAuth } from "@services/APIAdapter";

import { contactSelector } from "@store/user/user.slices";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const selectAllContacts = (state) => contactSelector.selectAll(state.rooms);

const EditConversationForm = (props) => {
  const userState = useSelector((state) => state.user);
  const contactList = selectAllContacts(userState);

  const [userList, setUserList] = useState([]);
  const [detail, setDetail] = useState({});

  if (!props.new) {
    setUserList(props.users);
    setDetail(props.detail);
  }

  const handleAddUser = (contact) => {
    setUserList([...userList, contact]);
  };

  const handleSubmit = () => {
    postWithAuth("/api/box/new", {
      detail: detail,
      user: userList.map((user) => user._id),
    });
  };

  return (
    <div>
      <div>Search bar</div>
      <div>Selected Row</div>
      <div>
        {contactList.map((contact) => (
          <div>
            <span>{contact.username}</span>
            <button
              onClick={() => {
                handleAddUser(contact);
              }}
            >
              Add
            </button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export const EditConversationModal = (props) => (
  <Dialog open={props.open} onClose={props.handleClose}>
    <DialogTitle>
      {props.new ? "New Conversation" : "Edit Conversation"}
    </DialogTitle>
    <DialogContent>
      <EditConversationForm new={props.new} />
    </DialogContent>
  </Dialog>
);

export default EditConversationForm;
