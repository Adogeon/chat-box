import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//style import
import style from "./SignInForm.module.css";
import button from "../../../styles/Button/button.module.css";

//component import
import Form from "../../../components/form/Form";
import TextInput from "../../../components/form/TextInput";
import FormSubmitButton from "../../../components/form/FormSubmitButton";

//action import
import { signInUser } from "../../../store/auth/auth.slices.js";
import { loadCurrent } from "../../../store/user/user.slices.js";

const SignInForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (data) => {
    dispatch(signUpUser)
      .then(() => dispatch(loadCurrent()))
      .then(() => history.push("/"));
  };
  return (
    <Form>
      <TextInput
        name="username"
        validate="required"
        label="Username"
        classes={{
          contClass: style.textInputContainer,
          errorClass: style.errorClass,
        }}
      />
      <TextInput
        name="password"
        validate="required"
        label="Password"
        type="password"
        classes={{
          contClass: style.textInputContainer,
          errorClass: style.errorClass,
        }}
      />
      <div className={style.actionArea}>
        <FormSubmitButton
          styleClass={button.full}
          events={{
            onSubmit: (data) => handleSubmit(data),
          }}
        >
          SIGN IN
        </FormSubmitButton>
      </div>
    </Form>
  );
};

export default SignInForm;
