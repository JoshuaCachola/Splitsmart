import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import AddFriend from './AddFriend';
import { handleShowAddFriends } from '../../../redux-store/actions';
import { GET_FRIENDS } from '../../../gql/queries';
import { USER_ID } from '../../../utils/constants';

const Friends = () => {
  const dispatch = useDispatch();
  const isShowingAddFriend = useSelector(
    ({ reducers }) => reducers.showAddFriends);
  const { loading, error, data } = useQuery(GET_FRIENDS, {
    variables: { userId: localStorage.getItem(USER_ID) }
  })

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
