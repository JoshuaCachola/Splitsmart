import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import AddFriend from './AddFriend';
import { handleShowAddFriends } from '../../../redux-store/actions';

const Friends = () => {
  const dispatch = useDispatch();
  const isShowingAddFriend = useSelector(
    ({ reducers }) => reducers.showAddFriends);

  return (
    <Box display='flex' justifyContent='space-between'>
      <Box>Friends</Box>
      <Button onClick={() => dispatch(handleShowAddFriends(isShowingAddFriend))}>add</Button>
      {isShowingAddFriend &&
        <AddFriend isShowingAddFriend={isShowingAddFriend} />
      }
    </Box>
  );
};

export default Friends;
