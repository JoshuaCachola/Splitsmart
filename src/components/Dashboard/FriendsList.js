import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, makeStyles, Avatar, Button } from '@material-ui/core';

import { theme } from '../../theme';
import { handleFriendsSplitExpense } from '../../redux-store/actions';

const useStyles = makeStyles({
  bold: {
    fontWeight: 'bold'
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginLeft: '5px'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f6f6f6',
      color: '#5BC5A7'
    }
  },
});

const FriendsList = ({ friendsList, remove }) => {
  const dispatch = useDispatch();
  const friendsExpense = useSelector(({ reducers }) => reducers.friendsSplitExpense)
  const friendList = useSelector(({ reducers }) => reducers.yourFriends);
  const [friends, setFriends] = useState([]);
  const handleChooseFriend = e => {
    if (friendsList) {
      return;
    }
    const id = e.currentTarget.id;
    const foundFriend = friends.find(friend => friend.id === id);
    if (friendsExpense.indexOf(foundFriend) === -1) {
      dispatch(handleFriendsSplitExpense([...friendsExpense, foundFriend]));
    }
  };
  const handleRemoveFriends = e => {
    const id = e.currentTarget.id;
    dispatch(handleFriendsSplitExpense(friends, id));
  }

  useEffect(() => {
    if (friendsList) {
      setFriends(friendsList);
    } else {
      setFriends(friendList);
    }
  }, [friendsList]);

  const classes = useStyles();
  return (
    <Box display='flex' flexDirection='column'>
      {friends &&
        friends.map((friend, i) => {
          return (
            <Box
              key={i}
              id={friend.id}
              className={classes.container}
              onClick={handleChooseFriend}
              height={30}
            >
              <Box>
                <Avatar className={classes.avatar}>GL</Avatar>
              </Box>
              <Box className={classes.container}>
                <Box className={classes.bold}>
                  {friend.firstName} {friend.lastName}
                </Box>
              </Box>
              <Box>
                {friendsList && !remove &&
                  <Button id={friend.id} onClick={handleRemoveFriends}>X</Button>
                }
              </Box>
            </Box>
          )
        })
      }
    </Box>
  );
};

export default FriendsList;
