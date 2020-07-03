import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Homepage from './components/Homepage';
import ProtectedRoute from './ProtectedRoute';
import SignUp from './components/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import { USER_ID } from './utils/constants';


const App = () => {
  const currentUserId = useSelector(({ reducers }) => reducers.currentUserId);
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <ProtectedRoute
            path='/dashboard'
            currentUserId={!!currentUserId || !!localStorage.getItem(USER_ID)}
            exact={true}
            component={Dashboard}
          />
          <Route path='/signup' exact={true} component={SignUp} />
          <Route path='/' exact={true} component={Homepage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
