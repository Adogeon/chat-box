import { logInUser } from "../../adapters/authAdapter";

export const login = async (data, dispatch) => {
  console.log(data);
  dispatch({ type: "LOGIN_REQUEST" });
  const loginResult = await logInUser(data);
  dispatch({ type: "LOGIN_SUCCESS", payload: loginResult });
};

export const logout = () => {
  dispatch({ type: "LOGOUT" });
};
