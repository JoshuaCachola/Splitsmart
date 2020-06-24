import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { graphql } from '@apollo/react-hoc';

import Navbar from '../Navbar';
import MiddleContainer from './middleContainer/MiddleContainer';
import LeftContainer from './leftContainer/LeftContainer';
import { GET_FRIENDS } from '../../gql/queries';
import { USER_ID } from '../../utils/constants';
import { handleStoreFriends } from '../../redux-store/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_FRIENDS, {
    variables: { friend1Id: parseInt(localStorage.getItem(USER_ID)) }
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(handleStoreFriends(data.friends));
    }
  }, [data]);

  return (
    <>
      <Navbar />
      <Box display='flex'>
        {/* Left menu */}
        <LeftContainer />
        {/* Middle */}
        <Box>
          <Box display='flex' flexDirection='column'>
            <MiddleContainer />
          </Box>
        </Box>
        {/* Right */}
        <Box>

        </Box>
      </Box>
    </>
  );
};

export default graphql(GET_FRIENDS)(Dashboard);
