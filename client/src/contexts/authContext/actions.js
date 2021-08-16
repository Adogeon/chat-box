import { signInUser } from "../../adapters/authAdapter";

export const signIn = async (data, dispatch) => {
  dispatch({ type: "AUTH_REQUEST" });
  const loginResult = await signInUser(data);
  dispatch({ type: "SIGNIN_SUCCESS", payload: loginResult });
};

export const signUp = async (data, dispatch) => {
  console.log(data);
};

export const signOut = (dispatch) => {
  dispatch({ type: "SIGNOUT" });
};
