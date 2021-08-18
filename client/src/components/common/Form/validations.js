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
  
};
