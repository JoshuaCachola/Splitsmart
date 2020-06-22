import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import history from './utils/history';
import Homepage from './components/Homepage';
import ProtectedRoute from './ProtectedRoute';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn'
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route path='/signup' exact={true} component={SignUp} />
          <Route path='/login' exact={true} component={LogIn} />
          <Route path='/dashboard' exact={true} component={Dashboard} />
          <Route path='/' exact={true} component={Homepage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
