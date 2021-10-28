import React from "react";
import { useDispatch } from "react-redux";
//style import
import style from "../../../styles/Form/form.module.css";
import button from "../../../styles/Button/button.module.css";
//import component
import Form from "../../../components/form/Form";
import TextInput from "../../../components/form/TextInput";
import FormSubmitButton from "../../../components/form/FormSubmitButton";
//import action
import { signUpUser } from "../../../store/auth/auth.slices.js";
import { loadCurrent } from "../../../store/user/user.slices.js";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(signUpUser(data))
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
        onChange={(data) => console.log(data)}
      />
      <TextInput
        name="email"
        validate="required|email"
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
        validate="required|match:password"
        customrules={{
          "match:password": {
            rule: (fields) => {
              return new RegExp(`^${fields["password"].value}$`);
            },
            formatter: (fieldname) => {
              return `${fieldname} should match password field.`;
            },
          },
        }}
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
            onSubmit: (data) => handleSubmit(data),
          }}
        >
          Submit
        </FormSubmitButton>
      </div>
    </Form>
  );
};

export default SignUpForm;
