import React, { useState, useEffect } from 'react';
import { Box, makeStyles, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import { handleShowAddFriends } from '../../../redux-store/actions';
import { USER_SEARCH, GET_RECENT_ACTIVITY } from '../../../gql/queries';
import { FRIEND_REQUEST } from '../../../gql/mutations';
import { USER_ID } from '../../../utils/constants';

const useStyles = makeStyles({
  container: {
    marginTop: '5px'
  }
});

const AddFriend = ({ isShowingAddFriend }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [getUser, { data }] = useLazyQuery(USER_SEARCH);
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
      },
      refetchQueries: [{
        query: GET_RECENT_ACTIVITY,
        variables: { userId: localStorage.getItem(USER_ID) }
      }]
    })
    dispatch(handleShowAddFriends(isShowingAddFriend));
  };

  useEffect(() => {
    if (data) {
      console.log(email);
      console.log(data);
    }
  }, [data, email, setEmail]);

  const classes = useStyles();
  return (
    <Box onClick={handleAddFriendContainer}>
      <Box display='flex' flexDirection='column'>
        <TextField
          size='small'
          id="standard-search"
          label="Enter email"
          type="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button
          onClick={() => getUser({ variables: { email } })}
          size='small'
          variant='contained'
          color='primary'
          className={classes.container}
        >
          Search
        </Button>
      </Box>
      {data && data.user &&
        <Box display='flex' flexDirection='column'>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.user.firstName}</td>
                <td>{data.user.lastName}</td>
              </tr>
            </tbody>
          </table>
          <Button
            onClick={handleAddFriend}
            size='small'
            variant='contained'
            color='primary'
            className={classes.container}
          >
            Add Friend
          </Button>
        </Box>
      }
    </Box >
  );
};

export default AddFriend;
