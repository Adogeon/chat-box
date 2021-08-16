export const logInUser = async (userData) => {
  const loginFetch = await fetch({
    url: "/api/signin",
    method: "POST",
    body: {
      username: userData.username.value,
      password: userData.password.value,
    },
  });

  const loginData = await loginFetch.json();

  return loginData;
};
