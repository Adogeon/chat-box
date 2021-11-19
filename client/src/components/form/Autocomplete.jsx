import React, { useContext, useEffect } from "react";
import { FormCtx } from "./Form.jsx";
import { Autocomplete, TextField } from "@mui/material";

const MultipleAutocomplete = (props) => {
  const { name, defaultValue, ...rest } = props;
  const { updateFields, addField, validateField, fields, errors } =
    useContext(FormCtx);

  const field = fields[name] || { name };

  const {
    value = [],
    validate,
    customrules,
    placeholder,
    label = "",
    type = "autocomplete",
  } = field;

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
    addField({
      field: props,
      value: defaultValue || [],
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

  return (
    <Autocomplete
      multiple
      id={name}
      defaultValue={value}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label={fieldProps.label} />
      )}
      {...fieldProps}
    />
  );
};

export default MultipleAutocomplete;
