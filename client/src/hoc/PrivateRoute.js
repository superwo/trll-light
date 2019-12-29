import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import Login from '../layout/Login';

const PrivateRoute = ({ component, ...options }) => {
  const { isLoggedIn } = useContext(UserContext);

  const finalComponent = isLoggedIn ? component : Login;

  return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;
