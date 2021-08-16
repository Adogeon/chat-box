import { logInUser } from "../../adapters/authAdapter";

export const login = async (data, dispatch) => {
  console.log(data);
  console.log(dispatch);
  dispatch({ type: "LOGIN_REQUEST" });
  const loginResult = await logInUser(data);
  dispatch({ type: "LOGIN_SUCCESS", payload: loginResult });
};

export const logout = (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
