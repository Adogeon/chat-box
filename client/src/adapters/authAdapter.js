export const signInUser = async (userData) => {
  console.log(userData);
  const data = {
    username: userData.username.value,
    password: userData.password.value,
  };
  console.log(data);
  const signInFetch = await fetch("/api/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const signInData = await signInFetch.json();
  console.log(signInData);
  return;
};

export const signUpUser = async (userData) => {
  const data = {
    username: userData.username.value,
    email: userData.username.value,
    password: userData.password.value,
  };
  const signUpFetch = await fetch({
    url: "/api/signup",
    method: "POST",
    body: JSON.stringify(data),
  });
  const signUpdata = await signUpFetch.json();
  console.log(signUpData);
  return;
};
