export const getCurrentUser = async (token) => {
  const currentUserFetch = await fetch("/api/user/current", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const currentUserData = await currentUserFetch.json();
  return currentUserData;
};

export const addNewContact = async (userId, token) => {
  const updateUserFetch = await fetch("/api/user/addContact", {
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
  const updateUserData = await updateUserFetch.json();
  return updateUserData;
};

export const addNewConversation = async () => {
  console.log("Wait, sorry work on this later");
};
