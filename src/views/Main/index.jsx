import React from "react";
import { authUser } from "./services";

const Main = (props) => {
  authUser(props);
  return <h1>Main Page</h1>;
};

export default Main;
