import React, { useContext, useEffect } from "react";
import { FormCtx } from "./Form.jsx";

const TextInput = (props) => {
  const { name } = props;
  const { updateFields, addField, validateField, fields, errors } =
    useContext(FormCtx);

  const field = fields[name] || { name };
  const {
    value,
    rows,
    validate,
    customrules,
    placeholder,
    label = "",
    type = "text",
    classes = {},
    showValidate,
  } = field;
  const fieldError = errors[name];

  const { contClass, fieldClass, errorClass } = classes;
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
    });
  }, []);

  const fieldProps = {
    name,
    type,
    value,
    validate,
    customrules,
    placeholder,
    className: fieldClass,
    onChange: handleChange,
  };

  if (type === "textarea") {
    delete fieldProps.type;
    delete fieldProps.value;

    fieldProps.defaultValue = value;
    fieldProps.rows = rows || 2;
  }

  return field && field.value !== undefined ? (
    <div className={contClass}>
      {label}
      {type === "textarea" ? (
        <textarea {...fieldProps} />
      ) : (
        <input {...fieldProps} />
      )}
      {showValidate ? <p className={errorClass}>{fieldError}</p> : null}
    </div>
  ) : (
    ""
  );
};

export default TextInput;
