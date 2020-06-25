import React from 'react';
import { useSelector } from 'react-redux';
import { Box, makeStyles, Avatar } from '@material-ui/core';
import { USER_ID } from '../../utils/constants';

import { theme } from '../../theme';

const useStyles = makeStyles({
  bold: {
    fontWeight: 'bold'
  },
  container: {
    borderBottom: '1px solid #ddd'
  },
  avatar: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ddd'
  }
});

const FriendsList = () => {
  const friends = useSelector(({ reducers }) => reducers.yourFriends);

  console.log(friends)
  const classes = useStyles();
  return (
    <Box display='flex' flexDirection='column'>
      {friends &&
        friends.map((friend, i) => {
          if (friend.friend1.id === localStorage.getItem(USER_ID)) {
            return (
              <Box key={i} className={classes.container}>
                <Box>
                  <Avatar className={classes.avatar}>GL</Avatar>
                </Box>
                <Box className={classes.container}>
                  <Box className={classes.bold}>
                    {friend.friend2.firstName} {friend.friend2.lastName}
                  </Box>
                </Box>
              </Box>
            )
          } else {
            return (
              <Box key={i} className={classes.container}>
                <Box>
                  <Avatar className={classes.avatar}>GL</Avatar>
                </Box>
                <Box className={classes.container}>
                  <Box className={classes.bold}>
                    {friend.friend1.firstName} {friend.friend1.lastName}
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
