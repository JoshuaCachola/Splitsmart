import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { AUTH_TOKEN, USER_ID } from '../utils/constants';
import { LOGIN_USER } from '../gql/mutations';

const Login = ({ history }) => {
  const client = useApolloClient();
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser }) {
      localStorage.setItem(AUTH_TOKEN, loginUser.authToken);
      localStorage.setItem(USER_ID, loginUser.id);
      client.writeData({ data: { isLoggedIn: true } });
    }
  });

  const handleLogIn = e => {
    e.preventDefault();
    loginUser({ variables: { email, password } })
    if (!error) {
      history.push('/dashboard');
    }
  };


  return (
    <>
      <form onSubmit={handleLogIn}>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
    </>
  );
};

export default withRouter(Login);
