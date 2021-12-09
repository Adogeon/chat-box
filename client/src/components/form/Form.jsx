import React, { useState, createContext, useContext } from "react";

import validations from "./validations";

export const FormCtx = createContext({
  fields: {},
  error: {},
});

export const useFormValue = (fieldname) => {
  let formValue = useContext(FormCtx);
  return formValue.fields[fieldname].value;
};

const Form = ({ children, onSubmit }) => {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const addField = ({ field }) => {
    const { name, type } = field;
    console.log(field);
    if (type === "autocomplete") {
      field = {
        value: [],
        ...field,
      };
    } else {
      field = {
        value: "",
        ...field,
      };
    }

    if (name) {
      setFields((prevField) => {
        return {
          ...prevField,
          [name]: field,
        };
      });
    } else {
      throw new Error(`Please add "name" field to the input: ${field}`);
    }
  };

  const validateAll = () => {
    Object.keys(fields).map((key) => {
      validateField(key);
      addField({
        field: {
          ...fields[key],
          showValidate: true,
        },
      });
    });
  };

  const validateField = (name) => {
    let error = "";
    const {
      value: fieldValue,
      validate,
      displayName,
      customrules = {},
    } = fields[name];

    const rules = validate ? validate.split("|") : "";
    if (rules.length) {
      for (const rule in rules) {
        const ruleName = rules[rule];
        const validation = validations[ruleName] || customrules[ruleName];
        const isRuleSatisfied =
          ruleName !== "required" && !fieldValue
            ? true
            : validation.rule(fields).test(fieldValue.toString());

        if (!isRuleSatisfied) {
          error = validation.formatter.apply(null, [displayName || name]);
        }
        if (error !== "") {
          break;
        }
      }
    }

    setErrors((prevError) => {
      return { ...prevError, [name]: error };
    });
  };

  const updateFields = (event, { name, value, type }) => {
    if (event) {
      event.persist();
    }
    const field = fields[name];
    if (type === "autocomplete") {
      addField({
        field: {
          ...field,
          value: value,
        },
      });
    } else {
      addField({
        field: {
          ...field,
          value: event ? event.currentTarget.value : value,
        },
      });
    }
  };

  const formContextValue = {
    fields,
    errors,
    updateFields,
    addField,
    validateField,
    validateAll,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateAll();
    if (errors && Object.values(errors).join("").length !== 0) {
      console.error(errors);
    } else {
      onSubmit(fields);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormCtx.Provider value={formContextValue}>{children}</FormCtx.Provider>
    </form>
  );
};

export default Form;
