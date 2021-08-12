import React from "react";

//style import
import style from "../../styles/SignInPages/style.module.css";

//component import
import Form from "../common/Form";
import TextInput from "../common/TextInput";
import FormSubmitButton from "../common/FormSubmitButton";

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
        <button className="">Sign Up</button>
        <div>
          <button className="">Cancel</button>
          <FormSubmitButton
            events={{
              onSubmit: (data) => console.log(data),
            }}
          >
            Submit
          </FormSubmitButton>
        </div>
      </div>
    </Form>
  );
};

export default SignInForm;
