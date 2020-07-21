import React, { useState, useEffect } from 'react';
import { Box, makeStyles, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { handleShowAddFriends } from '../../../redux-store/actions';
import { GET_ALL_USERS, GET_RECENT_ACTIVITY } from '../../../gql/queries';
import { FRIEND_REQUEST } from '../../../gql/mutations';
import { USER_ID } from '../../../utils/constants';

const useStyles = makeStyles(theme => ({
  container: {
    margin: '10px 0'
  },
  notSelected: {
    color: '#999999',
    cursor: 'pointer',
    '&:hover': {
      color: `${theme.palette.primary.main}`
    }
  },
  selected: {
    color: `${theme.palette.primary.main}`,
    fontWeight: 'bold'
  },
  friendSearch: {
    maxHeight: '25vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    margin: '10px 0'
  }
}));

const AddFriend = ({ isShowingAddFriend }) => {
  const dispatch = useDispatch();
  const currentFriends = useSelector(({ reducers }) => reducers.yourFriends);
  const [user, setUser] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [potentialFriends, setPotentialFriends] = useState([]);
  const [filteredPotentialFriends, setFilteredPotentialFriends] = useState([]);
  const { data } = useQuery(GET_ALL_USERS);
  const [friendRequest, _] = useMutation(FRIEND_REQUEST);

  const handleAddFriendContainer = e => {
    e.preventDefault();
    if (e.target.tagName === 'DIV') {
      dispatch(handleShowAddFriends(isShowingAddFriend));
    }
  }

  const handleAddFriend = () => {
    friendRequest({
      variables: {
        friend1Id: parseInt(localStorage.getItem(USER_ID)),
        friend2Id: parseInt(selectedUser)
      },
      refetchQueries: [{
        query: GET_RECENT_ACTIVITY,
        variables: { userId: localStorage.getItem(USER_ID) }
      }]
    })
    dispatch(handleShowAddFriends(isShowingAddFriend));
  };

  const handleFilterFriends = e => {
    setUser(e.target.value);
    const filteredPotentialFriends = potentialFriends.filter(friend => {
      return friend.email.includes(user) || friend.fullName.includes(user);
    });
    setFilteredPotentialFriends(filteredPotentialFriends);
  };

  const potentialFriendList = () => {
    if (user.length) {
      return filteredPotentialFriends.map(friend => {
        return (
          <tr key={friend.id}
            className={selectedUser === friend.id ? classes.selected : classes.notSelected}
            onClick={() => {
              setSelectedUser(friend.id)
            }}
          >
            <td>{friend.firstName}</td>
            <td>{friend.lastName}</td>
          </tr>
        )
      });
    } else {
      return potentialFriends.map(friend => {
        return (
          <tr key={friend.id}
            className={selectedUser === friend.id ? classes.selected : classes.notSelected}
            onClick={() => {
              setSelectedUser(friend.id)
            }}
          >
            <td>{friend.firstName}</td>
            <td>{friend.lastName}</td>
          </tr>
        )
      });
    }
  };

  useEffect(() => {
    if (data) {
      const allUsers = [];
      data.getAllUsers.forEach(user => {
        const isFriend = currentFriends.find(friend => friend.id === user.id);
        if (!isFriend && user.id !== localStorage.getItem(USER_ID)) {
          const userObj = {};
          userObj.fullName = `${user.firstName} ${user.lastName}`;
          userObj.firstName = user.firstName;
          userObj.lastName = user.lastName;
          userObj.email = user.email;
          userObj.id = user.id;
          allUsers.push(userObj);
        }
      });
      setPotentialFriends(allUsers);
    }
  }, [data]);

  const classes = useStyles();
  return (
    <Box onClick={handleAddFriendContainer}>
      <Box display='flex' flexDirection='column'>
        <TextField
          size='small'
          id="standard-search"
          label="Enter name or email"
          type="text"
          value={user}
          onChange={handleFilterFriends}
        />
        {/* <Button
          onClick={() => getUser({ variables: { email } })}
          size='small'
          variant='contained'
          color='primary'
          className={classes.container}
        >
          Search
        </Button> */}
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        className={classes.friendSearch}
      >
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {potentialFriendList()}
          </tbody>
        </table>
        {selectedUser &&
          <Button
            onClick={handleAddFriend}
            size='small'
            variant='contained'
            color='primary'
            className={classes.container}
          >
            Add Friend
          </Button>
        }
      </Box>
    </Box >
  );
};

export default AddFriend;
