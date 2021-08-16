import axios from "axios";
import { API_URL } from "../../helpers/env";

export const authUser = (props) => {
  const jwt = JSON.parse(localStorage.getItem("login"));
  if (jwt) props.history.push("/");
};

export const login = async ({ username, password }, props) => {
  try {
    const result = await axios.post(`${API_URL}/user/login`, {
      username,
      password,
    });
    console.log(result.data);
    localStorage.setItem("login", JSON.stringify(result.data));
    props.history.push("/");
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const signup = async ({ username, email, password }, props) => {
  try {
    const result = await axios.post(`${API_URL}/user/signup`, {
      username,
      email,
      password,
    });
    localStorage.setItem("login", JSON.stringify(result.data));
    props.history.push("/");
  } catch (error) {
    const dupError = /E11000 duplicate key error/;

    // dupError (username already exist)
    console.log(error.response);
    if (dupError.test(error.response.data)) {
      throw new Error("username already exist");
    }
  }
};
