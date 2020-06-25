import React from 'react';
import { Box, makeStyles, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import LogIn from './LogIn';

const useStyles = makeStyles({

});

const Homepage = ({ history }) => {
  return (
    <>
      <header>
        <nav>
          <Box display="flex" justifyContent='space-between'>
            <Box>
              <div>GoodFellas</div>
            </Box>
            <Box>
              <Button color='primary'>Log in</Button>
              <Button
                variant='contained'
                color='primary'
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </nav>
      </header>
      <Box>
        <div>Let GoodFellas be the middleman to your next transaction</div>
      </Box>
      <LogIn />
    </>
  )
};

export default withRouter(Homepage);
