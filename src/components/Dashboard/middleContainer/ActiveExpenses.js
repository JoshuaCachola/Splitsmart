import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles, Box } from '@material-ui/core';
// import { ACTIVE_EXPENSES } from '../../../gql/queries';

const useStyles = makeStyles({

});

const ActiveExpenses = () => {
  // const { loading, error, data } = useQuery(ACTIVE_EXPENSES);
  const classes = useStyles();
  return (
    <Box display='flex' flexDirection='column'>

    </Box>
  );
};

export default ActiveExpenses;
