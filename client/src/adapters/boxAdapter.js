export const getBox = async (boxId, token) => {
  const boxFetch = await fetch(`/api/box/${boxId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const boxData = await boxFetch.json();
  return boxData;
};
