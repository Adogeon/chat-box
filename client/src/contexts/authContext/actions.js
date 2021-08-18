import { signInUser, signUpUser } from "../../adapters/authAdapter";

export const signIn = async (data, dispatch) => {
  dispatch({ type: "AUTH_REQUEST" });
  const loginResult = await signInUser(data);
  if (loginResult.error) {
    dispatch({ type: "AUTH_ERROR", payload: loginResult });
  } else {
    dispatch({ type: "SIGNIN_SUCCESS", payload: loginResult });
  }
};

export const signUp = async (data, dispatch) => {
  dispatch({ type: "AUTH_REQUEST" });
  const signUpResult = await signUpUser(data);
  if (signUpResult.error) {
    dispatch({ type: "AUTH_ERROR", payload: signUpResult });
  } else {
    dispatch({ type: "SIGNIN_SUCCESS", payload: signUpResult });
  }
};

export const signOut = (dispatch) => {
  dispatch({ type: "SIGNOUT" });
};
