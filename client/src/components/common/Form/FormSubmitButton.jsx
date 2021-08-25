import React, { useContext } from "react";
import { FormCtx } from ".";

const FormSubmitButton = (props) => {
  const { events, styleClass } = props;
  const { onSubmit } = events;
  const { fields, errors, validateAll } = useContext(FormCtx);

  const handleSubmit = () => {
    validateAll();
    if (errors && Object.values(errors).join("").length !== 0) {
      console.error(errors);
    } else {
      onSubmit(fields);
    }
  };

  return (
    <button
      type="submit"
      className={styleClass}
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
