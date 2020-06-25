import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
// import { graphql } from '@apollo/react-hoc';

import Navbar from '../Navbar';
import MiddleContainer from './middleContainer/MiddleContainer';
import LeftContainer from './leftContainer/LeftContainer';
import { GET_FRIENDS } from '../../gql/queries';
import { USER_ID } from '../../utils/constants';
import { handleStoreFriends } from '../../redux-store/actions';

const useStyles = makeStyles({
  middleContainer: {
    boxShadow: '0 0 12px rgba(0,0,0,0.2)',
    minHeight: '100vh'
  },
  container: {}
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_FRIENDS, {
    variables: { friendId: localStorage.getItem(USER_ID) }
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(handleStoreFriends(data.getFriends));
    }
  }, [data]);
  console.log(data);
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Box display='flex' className={classes.container}>
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
            m={0.2}
          >
            <MiddleContainer />
          </Box>
        </Box>
        {/* Right */}
        <Box flexBasis='30%'>

        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
