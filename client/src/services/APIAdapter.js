export const fetchWithAuth = (URL, ...fetchOption) => {
  const token = localStorage.getItem("authToken");

  return fetch(URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    ...fetchOption,
  });
};

export const getWithAuth = async (URL) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const postWithAuth = async (URL, data) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};
