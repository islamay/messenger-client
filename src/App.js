import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'
import Home from "./views/Home";
import Main from "./views/Main";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth" component={Home} />
          <ProtectedRoute exact path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
