import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core';

const GET_USER = gql`
  query getUser($id: id) {
      user(id: $id) {
        first_name,
        last_name,
        email,
        avatar
      }
    }
`;

const GET_TRANSACTIONS = gql`
  query getTransactions($user_id: id) {
    transactions(id: $user_id) {
      amount,
      paid_on
    }
  }
`;

const useStyles = makeStyles({
  avatar: {

  }
});

const Profile = () => {
  // get id from local storage or from redux
  const [avatarFile, setAvatarFile] = useState('');
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id }
  });
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: { id }
  });

  const classes = useStyles();
  return (
    <>
      <Box>
        <h2>Your Account</h2>
      </Box>
      {/* Middle container */}
      <Box display='flex'>
        <Box flexDirection='column' className={classes.avatar}>
          <img src='avatar.jpg' alt='avatar-img' />
          <div>Change you avatar</div>
          <input
            type='file'
            value={avatarFile}
            onChange={e => setAvatarFile(e.target.value[0])}
          />
        </Box>
        <Box display='flex'>
          <Box flexDirection='column'>
            <Box>
              <div>Your name</div>
              {/* <div>{data.user.firstName} {data.user.lastName}</div> */}
              <div>Henry Hill</div>
            </Box>
            <Box>
              <div>Your email address</div>
              {/* <div>{data.user.email}</div> */}
              <div>henry@hill.com</div>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Line Graph */}
      <Box>
        {/* Select for changing the graph based on the month and year */}
        {/* <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            label="Month"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Jan</MenuItem>
            <MenuItem value={20}>Feb</MenuItem>
            <MenuItem value={30}>March</MenuItem>
          </Select>
        </FormControl> */}
      </Box>
      <Box>
        {/* <LineGraph data={graphData}/> */}
      </Box>
    </>
  );
};

export default Profile;
