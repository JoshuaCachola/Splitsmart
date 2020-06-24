import React, { useState, useEffect } from 'react';
import { Box, makeStyles, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import { handleShowAddFriends } from '../../../redux-store/actions';
import { USER_SEARCH } from '../../../gql/queries';
import { FRIEND_REQUEST } from '../../../gql/mutations';
import { USER_ID } from '../../../utils/constants';

const useStyles = makeStyles({
  container: {

  }
});

const AddFriend = ({ isShowingAddFriend }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [getUser, { loading, error, data }] = useLazyQuery(USER_SEARCH);
  const [friendRequest, _] = useMutation(FRIEND_REQUEST);

  const handleAddFriendContainer = e => {
    e.preventDefault();
    console.log(e.target.tagName);
    if (e.target.tagName === 'DIV') {
      dispatch(handleShowAddFriends(isShowingAddFriend));
    }
  }

  const handleAddFriend = () => {
    friendRequest({
      variables: {
        friend1Id: parseInt(localStorage.getItem(USER_ID)),
        friend2Id: parseInt(data.user.id)
      }
    })
  };

  useEffect(() => {
    if (data) {
      console.log(email);
      console.log(data);
    }
  }, [data, email, setEmail]);

  const classes = useStyles();
  return (
    <Box onClick={handleAddFriendContainer} className={classes.container}>
      <Box>
        <Box>Search by email</Box>
        <TextField
          id="standard-search"
          label="Search"
          type="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button onClick={() => getUser({ variables: { email } })}>Search</Button>
      </Box>
      {/* loading error or search results  */}
      {data &&
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.user.firstName}</td>
              <td>{data.user.lastName}</td>
              <td>{data.user.email}</td>
              <td><Button onClick={handleAddFriend}>Add Friend</Button></td>
            </tr>
          </tbody>
        </table>
      }
    </Box>
  );
};

export default AddFriend;
