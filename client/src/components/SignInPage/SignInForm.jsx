import React from "react";
import Form from "../common/Form";
import TextInput from "../common/TextInput";
import FormSubmitButton from "../common/FormSubmitButton";

const SignInForm = () => {
  <main>
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
        name="password"
        validate="required"
        label="Password"
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
  </main>;
};

export default SignInForm;
