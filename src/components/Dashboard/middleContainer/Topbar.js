import React from 'react';
import { Box, makeStyles, Button } from '@material-ui/core';

import history from '../../../utils/history';

const useStyles = makeStyles({
  topbar: {
    backgroundColor: '#EEEEEE'
  }
});

const Topbar = () => {
  const handleRouteToAddExpense = () => {
    history.push('/create-expense')
  };

  const classes = useStyles();
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      className={classes.topbar}
    >
      <Box>
        Dashboard
      </Box>
      <Box display='flex' justifyContent='flex-end'>
        <Box>
          <Button onClick={handleRouteToAddExpense}>Add an expense</Button>
        </Box>
        <Box>
          <Button>Settle up</Button>
        </Box>
      </Box>
    </Box>
  )
};

export default Topbar;
