import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../utils/constants';

// mutation to create a new user
const SIGNUP_MUTATION = gql`
  mutation SignUpMutation(
    $firstName: String!, $lastName: String!, $email: String!,
    $password: String!) {
    signUp(firstName: $firstName, lastName: $lastName,
      email: $email, password: $password) {
      token
    }
  }
`;

const SignUp = ({ history }) => {
  const [firstName, setFirstName] = useState(''),
    [lastName, setLastName] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('');

  const [signUp, { data }] = useMutation(SignUpMutation);

  const handleSignUp = e => {
    e.preventDefault();
    if (password === confirmPassword) {
      signUp({
        variables: {
          first_name: firstName,
          last_name: lastName,
          email,
          password
        }
      })
    } else {
      alert('Passwords do not match...');
    }
  }
  // const confirm = async data => {
  //   // const { token } =
  // };

  // const saveJWTToken = token => {
  //   localStorage.setItem(AUTH_TOKEN, token)
  // };

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

        </div>
      </form>
    </>
  );
};

export default SignUp;
