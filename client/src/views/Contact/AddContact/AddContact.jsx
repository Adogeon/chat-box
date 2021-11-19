import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Form, TextInput, FormSubmitButton } from "@components/form";
import { postWithAuth } from "@services/APIAdapter";

const AddContactModalForm = (props) => {
  const handleSubmitData = async (data) => {
    const result = await postWithAuth("/api/user/addContact", {
      username: data.username.value,
    });
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
        <FormSubmitButton
          events={{ onSubmit: handleSubmitData }}
          endIcon={<SendIcon />}
          variant="primary"
        >
          Send Request
        </FormSubmitButton>
      </DialogActions>
    </Form>
  );
};

export default AddContactModalForm;
