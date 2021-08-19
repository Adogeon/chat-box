export const initialState = {
  isAuth: false,
  token: "",
  userId: null,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SIGNIN_SUCCESS":
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isAuth: true,
        userId: action.payload.userId,
        token: action.payload.token,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
        userId: null,
        token: "",
      };
    case "AUTH_ERROR":
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error,
      };
    default:
      throw new Error(`Can't handle ${action.type}`);
  }
};
