import React from "react";
import Form from "../common/Form";
import TextInput from "../common/TextInput";
import FormSubmitButton from "../common/FormSubmitButton";

const SignUpForm = () => {
  return (
    <Form>
      <TextInput
        name="username"
        validate="required"
        label="Username"
        events={{
          onChange: (data) => console.log(data),
        }}
      />
      <TextInput
        name="email"
        validate="required"
        label="Password"
        events={{
          onChange: (data) => console.log(data),
        }}
      />
      <TextInput
        name="password"
        validate="required"
        label="Password"
        type="password"
        events={{
          onChange: (data) => console.log(data),
        }}
      />
      <TextInput
        name="repassword"
        validate="required"
        label="Confirm password"
        type="password"
        events={{
          onChange: (data) => console.log(data),
        }}
      />
      <FormSubmitButton
        events={{
          onSubmit: (data) => console.log(data),
        }}
      >
        Submit
      </FormSubmitButton>
    </Form>
  );
};

export default SignUpForm;
