import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Main from "./views/Main";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/auth" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
