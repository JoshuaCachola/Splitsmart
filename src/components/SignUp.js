import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { AUTH_TOKEN, USER_ID } from '../utils/constants';
import { CREATE_USER } from '../gql/mutations';

import history from '../utils/history';

const SignUp = () => {
  const client = useApolloClient();
  const [firstName, setFirstName] = useState(''),
    [lastName, setLastName] = useState(''),
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


  return (
    <>
      <form onSubmit={handleSignUp}>
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
          <button type='submit'>Sign Up</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
