import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import AddFriend from './AddFriend';
import FriendsList from '../FriendsList';
import { handleShowAddFriends } from '../../../redux-store/actions';
import { USER_ID } from '../../../utils/constants';

const useStyles = makeStyles({
  header: {
    marginLeft: '5px',
    background: '#f6f6f6',
    color: '#ccc',
    borderBottom: '1px solid #eee',
    borderTop: '1px solid #f3f3f3',
    padding: '0 5px',
  },
  textHeader: {
    verticalAlign: 'middle',
    fontSize: '11px'
  },
  addButton: {
    color: '#ccc',
    '&:hover': {
      color: '#5bc5a7'
    }
  }
});

const Friends = () => {
  const dispatch = useDispatch();
  const isShowingAddFriend = useSelector(
    ({ reducers }) => reducers.showAddFriends);

  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.header}>
        <Box display='flex' justifyContent='space-between'>
          <h2 className={classes.textHeader}>Friends</h2>
          <Button
            onClick={() => dispatch(handleShowAddFriends(isShowingAddFriend))}
            className={classes.addButton}
          >
            + add
          </Button>
          {isShowingAddFriend &&
            <AddFriend isShowingAddFriend={isShowingAddFriend} />
          }
        </Box>
      </Box>
      {/* show list of friends */}
      <FriendsList />
    </Box>
  );
};

export default Friends;
