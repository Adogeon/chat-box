import React from "react";
import { useDispatch } from "react-redux";

//style import
import style from "./SignUpForm.module.css";
import button from "../../../styles/Button/button.module.css";

//component import
import Form from "../../../components/form/Form";
import TextInput from "../../../components/form/TextInput";
import FormSubmitButton from "../../../components/form/FormSubmitButton";

//action import
import { signUpUser } from "../../../store/auth/auth.slices.js";

const SignUpForm = () => {
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
        name="email"
        validate="required"
        label="Email"
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
      <TextInput
        name="repassword"
        validate="required"
        label="Confirm password"
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
            onSubmit: (data) => dispatch(signUpUser(data)),
          }}
        >
          Submit
        </FormSubmitButton>
      </div>
    </Form>
  );
};

export default SignUpForm;
