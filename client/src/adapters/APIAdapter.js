
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
    header: {
      authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const postWithAuth = async (URL, body) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(URL, {
    method: "POST",
    header: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};
