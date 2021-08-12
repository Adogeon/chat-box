import React, { useContext } from "react";
import { FormCtx } from "./Form";

const FormSubmitButton = (props) => {
  const { events } = props;
  const { onSubmit } = events;
  const { fields, errors, validateAll } = useContext(FormCtx);

  const handleSubmit = () => {
    validateAll();
    onSubmit(fields);
  };

  return (
    <button
      type="submit"
      disabled={errors && Object.values(errors).join("").length !== 0}
      onClick={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      {props.children}
    </button>
  );
};

export default FormSubmitButton;