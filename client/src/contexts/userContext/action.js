import { getCurrentUser } from "../../adapters/userAdapter";

export const loadCurrentUser = async (token, dispatch) => {
  dispatch({ type: "LOAD_USER" });
  console.log("should wait for a bit");
  const getResult = await getCurrentUser(token);
  console.log(getResult);
  if (getResult.error) {
    dispatch({ type: "LOAD_USER_ERROR", payload: getResult });
  } else {
    dispatch({ type: "LOAD_SUCCESS", payload: getResult });
  }
};

export const addNewConversation = () => {
  return null;
};
