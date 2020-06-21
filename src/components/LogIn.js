import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AUTH_TOKEN } from '../utils/constants';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

  const [logIn, { data }] = useMutation(LOGIN_MUTATION);
  const handleLogIn = e => {
    e.preventDefault();
    logIn({ variables: { email, password } })
  };

  // const confirm = async data => {
  //   // const { token } =
  // };

  // const saveJWTToken = token => {
  //   localStorage.setItem(AUTH_TOKEN, token)
  // };
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
