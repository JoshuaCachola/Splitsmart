import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AUTH_TOKEN, USER_ID } from '../utils/constants';
import { LOGIN_USER } from '../gql/mutations';
import { Button, TextField, Box, makeStyles } from '@material-ui/core';
import { handleDisplayUser } from '../redux-store/actions';

const useStyles = makeStyles({
  container: {
    marginTop: '5px',
    paddingTop: '20px'
  },
  loginHeader: {
    fontSize: '16px',
    color: '#999999',
    fontWeight: 'bold'
  },
  inputField: {
    fontSize: '18px',
    color: '#333333'
  },
  button: {
    width: '30%',
    marginTop: '20px'
  }
});

const Login = ({ history }) => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

  const [loginUser, { error }] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser }) {
      localStorage.setItem(AUTH_TOKEN, loginUser.authToken);
      localStorage.setItem(USER_ID, loginUser.id);
      client.writeData({ data: { isLoggedIn: true } });
      dispatch(handleDisplayUser({
        firstName: loginUser.firstName,
        lastName: loginUser.lastName
      }))
    }
  });

  const handleLogIn = e => {
    e.preventDefault();
    loginUser({ variables: { email, password } })
    if (!error) {
      history.push('/dashboard');
    }
  };

  const classes = useStyles();
  return (
    <>
      <form onSubmit={handleLogIn}>
        <div className={classes.loginHeader}>
          WELCOME TO SPLITSMART
        </div>
        <Box display='flex' flexDirection='column' className={classes.container}>
          <label className={classes.inputField}>Email address</label>
          <TextField
            variant='outlined'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Box>
        <Box display='flex' flexDirection='column' className={classes.container}>
          <label className={classes.inputField}>Password</label>
          <TextField
            variant='outlined'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Box>
        <Box display='flex' flexDirection='column' className={classes.button}>
          <Button
            type="submit"
            variant='contained'
            color='secondary'
          >
            Log in
          </Button>
        </Box>
      </form>
    </>
  );
};

export default withRouter(Login);
