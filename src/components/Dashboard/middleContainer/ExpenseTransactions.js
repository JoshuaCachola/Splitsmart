import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_EXPENSE_TRANSACTIONS } from '../../../gql/queries';
import { Box, Avatar, makeStyles } from '@material-ui/core';
import { theme } from '../../../theme';

const useStyles = makeStyles({
  bold: {
    fontWeight: 'bold'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px'
  },
  text: {
    padding: '8px'
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
});

const ExpenseTransactions = ({ expenseId }) => {
  const { data } = useQuery(GET_EXPENSE_TRANSACTIONS, {
    variables: { expenseId }
  });

  console.log(expenseId)
  const classes = useStyles();
  return (
    <>
      <Box className={classes.container}>
        {data &&
          data.getExpenseTransactions.map((transaction, i) => {
            return (
              <Box key={i} display='flex'>
                <Avatar className={classes.avatar}>SS</Avatar>
                <Box className={classes.text}>
                  <div><span className={classes.bold}>{transaction.user.firstName} {transaction.user.lastName[0]}. </span>
                    {transaction.isSettled ? 'paid ' : 'owes '}
                    <span className={classes.bold}>${transaction.amount}</span>
                  </div>
                </Box>
              </Box>
            )
          })
        }
      </Box>
    </>
  );
};

export default ExpenseTransactions;
