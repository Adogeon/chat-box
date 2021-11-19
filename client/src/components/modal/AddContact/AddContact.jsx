import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { Form, TextInput, FormSubmitButton } from "@components/form";

const AddContactModalForm = (props) => {
  const handleSubmitData = async (data) => {
    const result = await postWithAuth("/api/user/addContact", {
      username: data.username.value,
    });
    props.handleClose();
  };

  return (
      <Form>
        <DialogTitle>Add new contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add friend via their username
          </DialogContentText>
          <TextInput autoFocus label="Username" name="username" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} startIcon={<CloseIcon />}>
            Close
          </Button>
          <FormSubmitButton
            events={{ onSubmit: handleSubmitData }}
            endIcon={<SendIcon />}
          >
            Send Request
          </FormSubmitButton>
        </DialogActions>
      </Form>
  );
};

export default AddContactModalForm;
