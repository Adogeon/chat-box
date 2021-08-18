import React from "react";

//style import
import style from "../../styles/AuthPages/style.module.css";
import button from "../../styles/Button/button.module.css";

//component import
import Form from "../common/Form";
import TextInput from "../common/TextInput";
import FormSubmitButton from "../common/FormSubmitButton";

//action import
import { signIn } from "../../contexts/authContext";
import { useAuthDispatch } from "../../contexts/authContext";

const SignInForm = () => {
  const dispatch = useAuthDispatch();

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
        classes={{
          contClass: style.textInputContainer,
          errorClass: style.errorClass,
        }}
      />
      <div className={style.actionArea}>
        <FormSubmitButton
          styleClass={button.full}
          events={{
            onSubmit: (data) => signIn(data, dispatch),
          }}
        >
          SIGN IN
        </FormSubmitButton>
      </div>
    </Form>
  );
};

export default SignInForm;
