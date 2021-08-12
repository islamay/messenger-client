import axios from "axios";
import { API_URL } from "../../helpers/env";

export const authUser = (props) => {
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  if (!jwt) return props.history.push("/auth");
};

export const logout = async () => {
  const jwt = JSON.parse(localStorage.getItem("jwt"));

  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    await axios.post(`${API_URL}/user/logout`, {}, config);
    localStorage.clear();
    window.location.reload();
  } catch (error) {
    console.log("something error");
    console.log(error.response);
  }
};
