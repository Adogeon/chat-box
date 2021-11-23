import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//style import
import style from "../../../styles/Form/form.module.css";
//import component
import Form from "@components/form/Form";
import TextInput from "@components/form/TextInput";
import FormSubmitButton from "@components/form/FormSubmitButton";
import SendIcon from "@mui/icons-material/Send";
//import action
import { signUpUser } from "@store/auth/auth.slices.js";
import { loadCurrent } from "@store/user/user.slices.js";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (data) => {
    dispatch(signUpUser(data))
      .then(() => dispatch(loadCurrent()))
      .then(() => history.push("/"));
  };

  return (
    <Form>
      <TextInput
        name="username"
        validate="required"
        label="Username"
        fullWidth
      />
      <TextInput
        name="email"
        validate="required|email"
        label="Email"
        fullWidth
      />
      <TextInput
        name="password"
        validate="required"
        label="Password"
        type="password"
        fullWidth
      />
      <TextInput
        name="repassword"
        validate="required|match:password"
        customrules={{
          "match:password": {
            rule: (fields) => {
              return new RegExp(`^${fields["password"].value}$`);
            },
            formatter: (fieldname) => {
              return `${fieldname} should match password field.`;
            },
          },
        }}
        label="Confirm password"
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

export default SignUpForm;
