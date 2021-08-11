import React from "react";
import Form from "../common/Form";
import TextInput from "../common/TextInput";

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
    </Form>
  </main>;
};

export default SignInForm;
