export default {
  required: {
    rule: () => /\S/,
    formatter: (fieldName) => {
      return `${fieldName} is required`;
    },
  },
  numeric: {
    rule: () => /^\d+$/,
    formatter: (fieldName) => {
      return `${fieldName} should contain only numbers.`;
    },
  },
  email: {
    rule: () => /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
    formatter: (fieldname) => {
      return `${fieldname} should have valid email address.`;
    },
  },
};
