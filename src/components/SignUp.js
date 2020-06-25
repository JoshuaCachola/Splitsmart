import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { AUTH_TOKEN, USER_ID } from '../utils/constants';
import { TextField, Box, Button, makeStyles } from '@material-ui/core';

import { CREATE_USER } from '../gql/mutations';
import history from '../utils/history';

const useStyles = makeStyles({
  signUpContainer: {
    minWidth: '50%'
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
  }
});

const SignUp = () => {
  const client = useApolloClient();
  const [name, setName] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('');

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted({ createUser }) {
      console.log(createUser);
      localStorage.setItem(AUTH_TOKEN, createUser.authToken);
      localStorage.setItem(USER_ID, createUser.user.id);
      client.writeData({ data: { isLoggedIn: true } });

      // if loading or error
      // if (loading) return <Loading />;
      // if (error) return <p>An error occurred</p>;

      // return <LoginForm login={login} />;
    }
  });

  const handleSignUp = e => {
    e.preventDefault();
    const splitName = name.split(),
      firstName = splitName[0],
      lastName = splitName[1];
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
      <Box display='flex' justifyContent='center'>
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
                  placeholder='Henry Hill'
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
              <div>
                <Button
                  variant='contained'
                  type='submit'
                  color='secondary'
                >
                  Sign Up
            </Button>
              </div>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
