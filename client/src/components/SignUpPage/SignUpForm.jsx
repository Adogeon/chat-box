import React from "react";

//style import
import style from "../../styles/AuthPages/style.module.css";
import button from "../../styles/Button/button.module.css";

//component import
import Form from "../common/Form";
import TextInput from "../common/Form/TextInput";
import FormSubmitButton from "../common/Form/FormSubmitButton";

//action import
import { signUp } from "../../contexts/authContext";
import { useAuthDispatch } from "../../contexts/authContext";

const SignUpForm = () => {
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
            onSubmit: (data) => signUp(data, dispatch),
          }}
        >
          Submit
        </FormSubmitButton>
      </div>
    </Form>
  );
};

export default SignUpForm;
