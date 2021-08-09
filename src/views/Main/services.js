export const authUser = (props) => {
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  if (!jwt) return props.history.push("/auth");
};
