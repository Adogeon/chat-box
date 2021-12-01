import React, { useContext, useEffect } from "react";
import { FormCtx } from "./Form.jsx";
import { TextField } from "@material-ui/core";

const TextInput = (props) => {
  const { name, ...rest } = props;
  const { updateFields, addField, validateField, fields, errors } =
    useContext(FormCtx);

  const field = fields[name] || { name };
  const {
    value,
    validate,
    customrules,
    placeholder,
    label = "",
    type,
    showValidate,
  } = field;
  const fieldError = errors[name];

  const handleChange = (event) => {
    try {
      updateFields(event, field);
    } catch (error) {
      throw error;
    }

    if (typeof onChange === "function") {
      onChange({
        ...field,
        value: event.target.value,
      });
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      validateField(name);
    }
  }, [value, name]);

  useEffect(() => {
    addField({
      field: props,
      value,
      type: "text",
    });
  }, []);

  const fieldProps = {
    name,
    type,
    value,
    validate,
    customrules,
    placeholder,
    label,
    onChange: handleChange,
    ...rest,
  };

  return field && field.value !== undefined ? (
    showValidate ? (
      <TextField id={name} error helperText={fieldError} {...fieldProps} />
    ) : (
      <TextField id={name} {...fieldProps} />
    )
  ) : (
    ""
  );
};

export default TextInput;
