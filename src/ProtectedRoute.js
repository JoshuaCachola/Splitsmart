import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (
  { component: Component, path, currentUserId, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props => currentUserId ?
        <Component {...props} /> : <Redirect to='/Login' />}
    />
  )
};

export default ProtectedRoute;
