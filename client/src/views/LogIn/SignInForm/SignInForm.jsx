import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import socketContext from "@services/socketContext";
//style import
import style from "../../../styles/Form/form.module.css";
//component import
import Form from "@components/form/Form";
import TextInput from "@components/form/TextInput";
import FormSubmitButton from "@components/form/FormSubmitButton";
import SendIcon from "@mui/icons-material/Send";
//action import
import { signInUser } from "@store/auth/auth.slices.js";
import { loadCurrent } from "@store/user/user.slices.js";

const SignInForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { connectSocket } = React.useContext(socketContext);
  const handleSubmit = (data) => {
    dispatch(signInUser(data))
      .then(() => dispatch(loadCurrent()))
      .then((result) => {
        connectSocket();
        history.push("/");
      });
  };
  return (
    <Form data-testid="sign-in-form" onSubmit={handleSubmit}>
      <TextInput
        name="username"
        validate="required"
        label="Username"
        fullWidth
      />
      <TextInput
        name="password"
        validate="required"
        label="Password"
        type="password"
        fullWidth
      />
      <div className={style.actionArea}>
        <FormSubmitButton
          events={{
            onSubmit: (data) => handleSubmit(data),
          }}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Submit
        </FormSubmitButton>
      </div>
    </Form>
  );
};

export default SignInForm;
