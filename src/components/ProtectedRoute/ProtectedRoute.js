import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, path, children }) => {
  return (
    <Route exact path={path}>
      {isLoggedIn ? children : <Redirect to="/" />}
    </Route>
  );
};

export default ProtectedRoute;
