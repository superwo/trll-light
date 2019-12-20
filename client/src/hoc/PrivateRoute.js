import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import Login from '../layout/Login';

const PrivateRoute = ({ component, ...options }) => {
  const { user, authenticateUser } = useContext(UserContext);

  useEffect(() => {
    async function fu() {
      await authenticateUser();
    }
    fu();
  }, []);

  const finalComponent = user ? component : Login;

  return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;
