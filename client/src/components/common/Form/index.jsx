import React, { useState } from "react";

import validations from "./validations";

export const FormCtx = createContext({
  fields: {},
  error: {},
});

export default Form = (props) => {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const addField = ({ field }) => {
    const { name } = field;
    field = {
      value: "",
      ...field,
    };
    if (name) {
      setFields((prevField) => {
        return {
          ...prevField,
          [name]: field,
        };
      });
    }

    throw new Error(`Pplease add "key" field to the input: ${field}`);
  };

  const validateField = (name) => {
    let error = "";
    const {
      value: fieldValue,
      validate,
      displayName,
      customRules = {},
    } = fields[name];

    const rules = validate ? validate.split("|") : "";

    if (rules.length) {
      for (const rule in rules) {
        const ruleName = rules[rule];
        const validation = validations[ruleName] || customRules[ruleName];
        const isRuleSatisfied =
          ruleName !== "required" && !fieldValue
            ? true
            : validation.rule().test(fieldValue.toString());

        if (!isRuleSatisfied) {
          error = validation.formatter.apply(null, [displayName || id]);
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

  const setFields = (event, { key, value }) => {
    if (event) {
      event.persist();
    }
    const field = fields[key];
    addField({
      field: {
        ...field,
        value: event ? event.currentTarget.value : value,
      },
    });
  };

  const formContextValue = {
    fields,
    errors,
    setFields,
    addField,
    validateField,
  };

  return (
    <form action="">
      <FormCtx.Provider value={formContextValue}>
        {props.children}
      </FormCtx.Provider>
    </form>
  );
};
