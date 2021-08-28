export const initialState = {
  loading: false,
  errorMessage: null,
  username: "",
  userId: "",
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
        loading: false,
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
