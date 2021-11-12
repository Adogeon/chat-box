import React from "react";
//import components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Form, TextInput, FormSubmitButton } from "@components/form";
//import utils
import { postWithAuth } from "@services/APIAdapter";

const AddContactModal = (props) => {
  const handleSubmitData = async (data) => {
    const result = await postWithAuth("/api/user/addContact", {
      username: data.username.value,
    });
    props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="Add-new-contact"
      aria-describedby="Send-a-out-a-friend-request"
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <Form>
        <DialogTitle id="add-contact-dialog-title">
          {"Add new contact"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add friend via their username
          </DialogContentText>
          <TextInput autoFocus label="Username" name="username" fullWidth />
        </DialogContent>
        <DialogActions>
          <FormSubmitButton events={{ onSubmit: handleSubmitData }}>
            Send Request
          </FormSubmitButton>
          <Button onClick={props.handleClose}>Close</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default AddContactModal;
