import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import AddFriend from './AddFriend';
import { handleShowAddFriends } from '../../../redux-store/actions';

const Friends = ({ data }) => {
  const dispatch = useDispatch();
  const isShowingAddFriend = useSelector(
    ({ reducers }) => reducers.showAddFriends);

  console.log(data);
  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <Box>Friends</Box>
        <Button onClick={() => dispatch(handleShowAddFriends(isShowingAddFriend))}>add</Button>
        {isShowingAddFriend &&
          <AddFriend isShowingAddFriend={isShowingAddFriend} />
        }
      </Box>
      {/* show list of friends */}
      <Box>

      </Box>
    </>
  );
};

export default Friends;
