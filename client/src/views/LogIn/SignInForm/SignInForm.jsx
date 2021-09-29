import React from "react";
import { useDispatch } from "react-redux";

//style import
import style from "./SignInForm.module.css";
import button from "../../../styles/Button/button.module.css";

//component import
import Form from "../../../components/common/Form";
import TextInput from "../../../components/common/Form/TextInput";
import FormSubmitButton from "../../../components/common/Form/FormSubmitButton";

//action import
import { signInUser } from "../../../store/auth/auth.slices.js";

const SignInForm = () => {
  const dispatch = useDispatch();

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
            onSubmit: (data) => dispatch(signInUser(data)),
          }}
        >
          SIGN IN
        </FormSubmitButton>
      </div>
    </Form>
  );
};

export default SignInForm;
