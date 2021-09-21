import { getCurrentUser, addNewContact } from "../../adapters/userAdapter";

export const loadCurrentUser = async (token, dispatch) => {
  dispatch({ type: "LOAD_USER" });
  const getResult = await getCurrentUser(token);
  if (getResult.error) {
    dispatch({ type: "LOAD_USER_ERROR", payload: getResult });
  } else {
    dispatch({ type: "LOAD_SUCCESS", payload: getResult });
  }
};

export const addContact = async (userId, token, dispatch) => {
  const updateUserData = await addNewContact(userId, token);
  dispatch({ type: "UPDATE_USER", payload: updateUserData });
};

export const addNewConversation = () => {
  return null;
};
