import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import history from './history';
import Homepage from './components/Homepage';
import ProtectedRoute from './ProtectedRoute';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn'

const App = () => {
  return (
    <>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route path='/' exact={true} component={Homepage} />
          <Route path='/signup' exact={true} component={SignUp} />
          <Route path='/login' exact={true} component={LogIn} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
