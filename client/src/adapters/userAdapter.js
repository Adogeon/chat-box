export const getCurrentUser = async (token) => {
  const currentUserFetch = await fetch("/api/user/current", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const currentUserData = await currentUserFetch.json();
  return currentUserData;
};

export const addNewConversation = async () => {
  console.log("Wait, sorry work on this later");
};
