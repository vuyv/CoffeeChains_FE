export const setAuthHeaders = () => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return header;
};
