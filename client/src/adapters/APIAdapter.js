import store from "../store";

export const fetchWithAuth = (URL, ...fetchOption) => {
  console.log(store.getState().auth);
  const token = store.getState().auth.token;
  console.log(token);
  return fetch(URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    ...fetchOption,
  });
};
