import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';

import { ACTIVE_EXPENSES } from '../../../gql/queries';
import { USER_ID } from '../../../utils/constants';
import { Box, Avatar, LinearProgress } from '@material-ui/core';
import { timeDifferenceForDate } from '../../../utils/utilFunc';

const useStyles = makeStyles({
  container: {
    borderBottom: '1px solid #eee',
    display: 'flex',
    padding: '10px 10px 15px 10px',
    margin: '10px',
  },
  expenseTextContainer: {
    display: 'flex',
    fontSize: '16px',
  },
  expenseText: {
    textAlign: 'center'
  },
  avatar: {
    margin: 'auto'
  },
  tr: {
    paddingRight: '55px',
    borderBottom: '1px solid #eee',
  },
  expenseContainer: {
    maxHeight: '100vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
  }
});

const OpenExpenses = () => {
  const { loading, error, data } = useQuery(ACTIVE_EXPENSES, {
    variables: { userId: localStorage.getItem(USER_ID) }
  });

  const classes = useStyles();

  if (loading) {
    return (
      <LinearProgress color='primary' />
    )
  }
  return (
    <Box>
      <Box className={classes.tr}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Description</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
        </table>
      </Box>
      <Box className={classes.expenseContainer}>
        {data &&
          data.activeExpenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((expense, i) => {
            return (
              <Box key={i} className={classes.container}>
                <Box className={classes.avatar}>
                  <Avatar alt='groceries' src='groceries.png'></Avatar>
                </Box>
                <Box className={classes.expenseTextContainer}>
                  <table>
                    <tbody>
                      <tr>
                        <td>{expense.description}</td>
                        <td>${expense.amount.toFixed(2)}</td>
                        <td>{timeDifferenceForDate(expense.createdAt)}</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Box>
            )
          })
        }
      </Box>
    </Box>
  );
};

export default OpenExpenses;
