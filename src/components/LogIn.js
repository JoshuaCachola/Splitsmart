import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { AUTH_TOKEN, USER_ID } from '../utils/constants';
import { LOGIN_USER } from '../gql/mutations';

const Login = ({ history }) => {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

  const [logIn, { data }] = useMutation(LOGIN_USER);
  const handleLogIn = e => {
    e.preventDefault();
    logIn({ variables: { email, password } })
    setJWTToken(data);
  };

  const setJWTToken = ({ loginUser }) => {
    localStorage.setItem(AUTH_TOKEN, loginUser.authToken);
    localStorage.setItem(USER_ID, loginUser.id);

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

export default Login;
