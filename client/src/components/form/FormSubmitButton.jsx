import React, { useContext } from "react";
import { FormCtx } from "./Form";
import { Button, IconButton } from "@mui/material";

const FormSubmitButton = (props) => {
  const { buttonType, events, children, ...restProps } = props;
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

  return buttonType === "IconButton" ? (
    <IconButton type="submit" {...restProps}>
      {children}
    </IconButton>
  ) : (
    <Button type="submit" {...restProps}>
      {children}
    </Button>
  );
};

export default FormSubmitButton;
