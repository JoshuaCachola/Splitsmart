import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, makeStyles, Avatar } from '@material-ui/core';
import { USER_ID } from '../../utils/constants';

import { theme } from '../../theme';
import { friendsSplitExpense } from '../../redux-store/actions';

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

const FriendsList = ({ friendsList }) => {
  const dispatch = useDispatch();
  const friendsExpense = useSelector(({ reducers }) => reducers.friendsSplitExpense)
  const friendList = useSelector(({ reducers }) => reducers.yourFriends);
  const [friends, setFriends] = useState([]);
  const handleChooseFriend = e => {
    const idx = e.currentTarget.id;
    dispatch(friendsSplitExpense([...friendsExpense, friends[idx]]));
  };
  const handleRemoveFriends = e => {
    const idx = e.currentTarget.id;
    dispatch(friendsSplitExpense(friendsExpense.splice(idx, 1)));
  }

  useEffect(() => {
    if (friendsList) {
      setFriends(friendsList);
    } else {
      setFriends([...friendList]);
    }
  }, [friendsList]);

  console.log(friends)
  const classes = useStyles();
  return (
    <Box display='flex' flexDirection='column'>
      {friends &&
        friends.map((friend, i) => {
          if (friend.friend1.id === localStorage.getItem(USER_ID)) {
            return (
              <Box
                key={i}
                id={i}
                className={classes.container}
                onClick={handleChooseFriend}
                height={30}
              >
                <Box display='flex' alignItems='center'>
                  <Avatar className={classes.avatar}>GL</Avatar>
                </Box>
                <Box className={classes.container}>
                  <Box className={classes.bold}>
                    {friend.friend2.firstName} {friend.friend2.lastName}
                  </Box>
                  <Box>
                    {friendsList &&
                      <div className={classes.bold}>X</div>
                    }
                  </Box>
                </Box>
              </Box>
            )
          } else {
            return (
              <Box
                key={i}
                id={i}
                className={classes.container}
                onClick={handleChooseFriend}
                height={30}
              >
                <Box>
                  <Avatar className={classes.avatar}>GL</Avatar>
                </Box>
                <Box className={classes.container}>
                  <Box className={classes.bold}>
                    {friend.friend1.firstName} {friend.friend1.lastName}
                  </Box>
                  <Box>
                    {friendsList &&
                      <div className={classes.bold}>X</div>
                    }
                  </Box>
                </Box>
              </Box>
            )
          }
        })
      }
    </Box>
  );
};

export default FriendsList;
