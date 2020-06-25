import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Homepage from './components/Homepage';
import ProtectedRoute from './ProtectedRoute';
import SignUp from './components/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import CreateExpense from './components/dashboard/CreateExpense';

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path='/signup' exact={true} component={SignUp} />
          <Route path='/dashboard' exact={true} component={Dashboard} />
          <Route path='/create-expense' exact={true} component={CreateExpense} />
          <Route path='/' exact={true} component={Homepage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
