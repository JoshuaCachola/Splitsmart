import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import { AUTH_TOKEN, USER_ID } from '../utils/constants';
import { TextField, Box, Button, makeStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { CREATE_USER } from '../gql/mutations';
import { handleDisplayUser } from '../redux-store/actions';

const useStyles = makeStyles({
  signUpContainer: {
    minWidth: '30%',
    marginTop: '50px'
  },
  bold: {
    fontWeight: 'bold'
  },
  name: {
    fontSize: '24px'
  },
  emailAndPassword: {
    fontSize: '18px'
  },
  introduction: {
    fontSize: '16px',
    color: '#999999'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '200%',
    height: '200%',
  },
  button: {
    marginTop: '5px'
  }
});

const SignUp = ({ history }) => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [name, setName] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('');

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted({ createUser }) {
      localStorage.setItem(AUTH_TOKEN, createUser.authToken);
      localStorage.setItem(USER_ID, createUser.user.id);
      client.writeData({ data: { isLoggedIn: true } });
      dispatch(handleDisplayUser({
        firstName: createUser.user.firstName,
        lastName: createUser.user.lastName
      }))
    }
  });

  const handleSignUp = e => {
    e.preventDefault();
    const splitName = name.split(' ');
    const firstName = splitName[0];
    const lastName = splitName[1];
    if (password === confirmPassword) {
      createUser({
        variables: {
          firstName,
          lastName,
          email,
          password
        }
      });
    } else {
      alert('Passwords do not match...');
    }
    history.push('/dashboard')
  }

  const classes = useStyles();
  return (
    <>
      <Box className={classes.container}>
        <Box m={12}>
          <img className={classes.image} src='logo.svg' alt='logo-pic' />
        </Box>
        <Box className={classes.signUpContainer}>
          <form onSubmit={handleSignUp} autoCompplete='off'>
            <Box display='flex' flexDirection='column'>
              <div className={classes.introduction}>INTRODUCE YOURSELF</div>
              <Box display='flex' flexDirection='column'>
                <label className={classes.name}>Hi there! My name is</label>
                <TextField
                  type='text'
                  variant="outlined"
                  onChange={e => setName(e.target.value)}
                  placeholder='Demo User'
                  required
                />
              </Box>
              <label className={classes.emailAndPassword}>Here's my <span className={classes.bold}>email address:</span></label>
              <TextField
                type='email'
                variant="outlined"
                onChange={e => setEmail(e.target.value)}
                required
              />
              <label className={classes.emailAndPassword}>Here's my <span className={classes.bold}>password:</span></label>
              <TextField
                type='password'
                variant="outlined"
                onChange={e => setPassword(e.target.value)}
                required
              />
              <label className={classes.emailAndPassword}>And here's my <span className={classes.bold}>password again:</span></label>
              <TextField
                type='password'
                variant="outlined"
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <Box>
                <Button
                  variant='contained'
                  type='submit'
                  color='secondary'
                  className={classes.button}
                >
                  Sign Up
            </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default withRouter(SignUp);
