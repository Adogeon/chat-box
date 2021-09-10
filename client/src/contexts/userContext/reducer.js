export const initialState = {
  loading: false,
  errorMessage: null,
  username: "",
  userId: "",
  contact: [],
  box: [],
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return {
        ...state,
        loading: true,
      };
    case "LOAD_SUCCESS":
      return {
        ...state,
        username: action.payload.username,
        userId: action.payload._id,
        box: action.payload.box,
        contact: action.payload.contact,
        loading: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        username: action.payload.username,
        userId: action.payuload.id,
        box: action.payload.box,
        contact: action.payload.contact,
      };
    case "LOAD_USER_ERROR":
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error,
      };
    default:
      throw new Error(`Can't handle ${action}`);
  }
};
