import React from 'react';
import { Box } from '@material-ui/core';

import Navbar from '../Navbar';
import MiddleContainer from './middleContainer/MiddleContainer';
import LeftContainer from './leftContainer/LeftContainer';

const Dashboard = () => {
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

export default Dashboard;
