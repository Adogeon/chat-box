export const signInUser = async (userData) => {
  const data = {
    username: userData.username.value,
    password: userData.password.value,
  };
  const signInFetch = await fetch("/api/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const signInData = await signInFetch.json();
  return signInData;
};

export const signUpUser = async (userData) => {
  const data = {
    username: userData.username.value,
    email: userData.username.value,
    password: userData.password.value,
  };
  const signUpFetch = await fetch("/api/signup", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  const signUpData = await signUpFetch.json();
  return signUpData;
};
