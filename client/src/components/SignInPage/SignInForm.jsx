import React from "react";

//style import
import style from "../../styles/SignInPages/style.module.css";
import button from "../../styles/Button/button.module.css";

//component import
import Form from "../common/Form";
import TextInput from "../common/TextInput";
import FormSubmitButton from "../common/FormSubmitButton";

//action import
import { login } from "../../contexts/authContext";

const SignInForm = () => {
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
        events={{
          onChange: (data) => console.log(data),
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
        events={{
          onChange: (data) => console.log(data),
        }}
      />
      <div className={style.actionArea}>
        <FormSubmitButton
          styleClass={button.full}
          events={{
            onSubmit: (data) => login(data),
          }}
        >
          SIGN IN
        </FormSubmitButton>
      </div>
    </Form>
  );
};

export default SignInForm;
