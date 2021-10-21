import store from "../store";

export const fetchWithAuth = (URL, ...fetchOption) => {
  const token = localStorage.getItem("authToken");

  return fetch(URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    ...fetchOption,
  });
};
