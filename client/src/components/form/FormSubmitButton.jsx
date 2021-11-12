import React, { useContext } from "react";
import { FormCtx } from "./Form";
import { Button } from "@mui/material";

const FormSubmitButton = (props) => {
  const { events, ...restProps } = props;
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
    <Button
      type="submit"
      onClick={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      {...restProps}
    >
      {props.children}
    </Button>
  );
};

export default FormSubmitButton;
