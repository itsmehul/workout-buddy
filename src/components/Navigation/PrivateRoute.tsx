import React from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";

interface PrivateRouteProps {
  permissions: Array<string>;
}

const PrivateRoute: React.FC<RouteProps & PrivateRouteProps> = ({
  permissions,
  component,
  exact,
  ...rest
}) => {
  const history = useHistory();
  const { isAuthenticated } = useFirebase();

  if (!isAuthenticated) {
    history.push("/welcome");
  }

  return <Route {...rest} component={component} exact={!!exact} />;
};

export default PrivateRoute;
