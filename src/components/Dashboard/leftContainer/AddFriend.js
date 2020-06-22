import React, { useState } from 'react';
import { Box, makeStyles, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import { handleShowAddFriends } from '../../../redux-store/actions';
import { USER_SEARCH } from '../../../gql/queries';
const useStyles = makeStyles({
  container: {

  }
});

const AddFriend = ({ isShowingAddFriend }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { loading, error, data, refetch } = useQuery(USER_SEARCH, {
    variables: { email }
  });

  const handleAddFriend = e => {
    console.log(e.target.tagName);
    if (e.target.tagName === 'DIV') {
      dispatch(handleShowAddFriends(isShowingAddFriend));
    }
  }

  const classes = useStyles();
  return (
    <Box onClick={handleAddFriend} className={classes.container}>
      <Box>
        <Box id='email-text-label'>Search by email</Box>
        <TextField
          id="standard-search"
          label="search field"
          type="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button onClick={() => refetch()}>Search</Button>
      </Box>
      {/* loading error or search results  */}
    </Box>
  );
};

export default AddFriend;
