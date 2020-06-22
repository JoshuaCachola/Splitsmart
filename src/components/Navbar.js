import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navContainer: {
    maxWidth: '80%',
    justifyContent: 'center'
  }
});

const Navbar = ({ history }) => {
  const classes = useStyles();

  return (
    <nav>
      <Box className={classes.navContainer}>
        <Box display='flex' justifyContent='space-between'>
          <Box>
            GoodFellas
          </Box>
          <Box>
            <ul>
              <li>Your account</li>
              <li>Create a group</li>
              <li>Log out</li>
            </ul>
          </Box>
        </Box>
      </Box>
    </nav>
  )
};

export default Navbar;
