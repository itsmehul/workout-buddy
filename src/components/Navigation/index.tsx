import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../../config/routes";
import PrivateRoute from "./PrivateRoute";

const Navigation: React.FC = () => {
  return (
    <Router>
      <Switch>
        {routes
          .filter(({ auth }) => auth)
          .map(({ auth, ...routeProps }) => (
            <PrivateRoute {...routeProps} />
          ))}
        {routes
          .filter(({ auth }) => !auth)
          .map(({ auth, exact, ...routeProps }) => (
            <Route {...routeProps} exact={!!exact} />
          ))}
      </Switch>
    </Router>
  );
};

export default Navigation;
