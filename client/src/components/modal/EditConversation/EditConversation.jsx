import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { contactSelector } from "@store/user/user.slices";
import { addNewRoom } from "@store/room/room.actions";
import { closeModal } from "@store/app/app.slices";

import { postWithAuth } from "@services/APIAdapter";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import {
  Form,
  TextInput,
  FormSubmitButton,
  MultipleAutocomplete,
} from "@components/form";

const selectAllContacts = (state) => contactSelector.selectAll(state.contacts);

const EditConversationModalForm = (props) => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const contactList = selectAllContacts(userState);
  const currentRoomState = useSelector((state) => state.room.currentRoom);
  const currentRoomMember = useSelector((state) => state.room.currentMember);

  const handleSubmitData = async (data) => {
    if (props.new) {
      dispatch(
        addNewRoom({
          detail: { name: data.name.value },
          users: data.member.value.map((member) => member._id) || [],
        })
      );
    } else {
      await postWithAuth(`/api/box/edit/${currentRoomState._id}`);
    }
    props.handleClose();
  };

  return (
    <Form>
      <DialogTitle>
        {props.new ? "Add New Conversation" : "Edit conversation"}
      </DialogTitle>
      <DialogContent>
        {props.new ? (
          <>
            <TextInput label="Room name" name="name" fullWidth value={""} />
            <MultipleAutocomplete
              label="Member"
              name="member"
              options={contactList}
              getOptionLabel={(option) => option.username}
              filterSelectedOptions
            />
          </>
        ) : (
          <>
            <TextInput
              label="Room name"
              name="name"
              fullWidth
              value={currentRoomState.name}
            />
            <MultipleAutocomplete
              label="Member"
              name="member"
              options={contactList}
              value={currentRoomMember}
              getOptionLabel={(option) => option.username}
              filterSelectedOptions
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} startIcon={<CloseIcon />}>
          Close
        </Button>
        <FormSubmitButton
          events={{ onSubmit: handleSubmitData }}
          endIcon={<SaveIcon />}
        >
          Save
        </FormSubmitButton>
      </DialogActions>
    </Form>
  );
};

export default EditConversationModalForm;
