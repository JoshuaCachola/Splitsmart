import React, { useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import Navbar from '../Navbar';
import MiddleContainer from './middleContainer/MiddleContainer';
import LeftContainer from './leftContainer/LeftContainer';
import RightContainer from './rightContainer/RightContainer';
import { GET_FRIENDS } from '../../gql/queries';
import { USER_ID } from '../../utils/constants';
import { handleStoreFriends } from '../../redux-store/actions';

const useStyles = makeStyles({
  middleContainer: {
    boxShadow: '0 0 12px rgba(0,0,0,0.2)',
    minHeight: '100vh'
  },
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem(USER_ID);
  const { data } = useQuery(GET_FRIENDS, {
    variables: {
      friendId: userId
    }
  });

  useEffect(() => {
    if (data) {
      dispatch(handleStoreFriends(data.getFriends, userId));
    }
  }, [data]);

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Box display='flex'>
        {/* Left menu */}
        <Box flexBasis='30%'>
          <LeftContainer />
        </Box>
        {/* Middle */}
        <Box flexBasis='40%'>
          <Box
            display='flex'
            flexDirection='column'
            className={classes.middleContainer}
            m={0.25}
          >
            <MiddleContainer />
          </Box>
        </Box>
        {/* Right */}
        <Box flexBasis='30%'>
          <RightContainer />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
