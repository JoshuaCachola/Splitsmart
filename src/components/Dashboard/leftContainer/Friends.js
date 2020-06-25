import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import AddFriend from './AddFriend';
import { handleShowAddFriends } from '../../../redux-store/actions';

const useStyles = makeStyles({
  header: {
    marginLeft: '5px',
    background: '#f6f6f6',
    color: '#ccc',
    fontSize: '11px',
    borderBottom: '1px solid #eee',
    borderTop: '1px solid #f3f3f3',
    padding: '0 5px'
  }
});

const Friends = ({ data }) => {
  const dispatch = useDispatch();
  const isShowingAddFriend = useSelector(
    ({ reducers }) => reducers.showAddFriends);

  const classes = useStyles();
  console.log(data);
  return (
    <Box>
      <Box className={classes.header}>
        <Box display='flex' justifyContent='space-between'>
          <div>Friends</div>
          <Button onClick={() => dispatch(handleShowAddFriends(isShowingAddFriend))}>add</Button>
          {isShowingAddFriend &&
            <AddFriend isShowingAddFriend={isShowingAddFriend} />
          }
        </Box>
      </Box>
      {/* show list of friends */}
      <Box>

      </Box>
    </Box>
  );
};

export default Friends;
