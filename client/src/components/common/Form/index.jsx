import React, { useState, createContext } from "react";

import validations from "./validations";

export const FormCtx = createContext({
  fields: {},
  error: {},
});

const Form = (props) => {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const addField = ({ field }) => {
    const { name } = field;
    field = {
      value: "",
      ...field,
    };
    console.log(field);
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

  const updateFields = (event, { name, value }) => {
    if (event) {
      event.persist();
    }
    const field = fields[name];
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
    updateFields,
    addField,
    validateField,
    validateAll,
  };

  return (
    <form action="">
      <FormCtx.Provider value={formContextValue}>
        {props.children}
      </FormCtx.Provider>
    </form>
  );
};

export default Form;
