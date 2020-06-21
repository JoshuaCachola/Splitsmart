import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../utils/constants';

// mutation to create a new user
const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $username: String!, $firstName: String!, $lastName: String!,
    $email: String!, $password: String!) {
    signup(username: $username, firstName: $firstName, lastName: $lastName,
      email: $email, password: $password) {
      token
    }
  }
`;

const SignUp = ({ history }) => {
  const [username, setUsername] = useState(''),
    [firstName, setFirstName] = useState(''),
    [lastName, setLastName] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('');

  const confirm = async data => {
    // const { token } =
  };

  const saveJWTToken = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <label>Username</label>
        <input
          type='text'
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label>First name</label>
        <input
          type='text'
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <label>Last name</label>
        <input
          type='text'
          onChange={e => setLastName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type='email'
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type='password'
          onChange={e => setPassword(e.target.value)}
          required
        />
        <label>ConfirmPassword</label>
        <input
          type='password'
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <div>
          <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{
              username,
              firstName,
              lastName,
              email,
              password
            }}
            onCompleted={data => confirm(data)}
          >
            {mutation => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'create account'}
              </div>
            )}
          </Mutation>
        </div>
      </form>
    </>
  );
};

export default SignUp;
