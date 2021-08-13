export const logInUser = async (data) => {
  const loginFetch = await fetch({
    url: "/api/signin",
    method: "POST",
    body: { data },
  });

  const loginData = await loginFetch.json();

  return loginData;
};
