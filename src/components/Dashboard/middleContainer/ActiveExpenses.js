import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles, Box, Button, Avatar, LinearProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { GET_ACTIVE_TRANSACTIONS } from '../../../gql/queries';
import { USER_ID } from '../../../utils/constants';
import { theme } from '../../../theme';
import ExpenseComments from './ExpenseComments';
import { timeDifferenceForDate } from '../../../utils/utilFunc';
import { handleShowSettleTransaction } from '../../../redux-store/actions';
import SettleTransaction from './SettleTransaction';

const useStyles = makeStyles({
  transactionsNotification: {
    display: 'flex',
    borderBottom: '1px solid #ddd',
    padding: '16px',
    fontSize: '16px',
    lineHeight: '21px',
    minHeight: '40px',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: '#f6f6f6'
    }
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: '5px'
  },
  bold: {
    fontWeight: 'bold'
  },
  oweUser: {
    color: '#FF652F',
    fontWeight: 'bold'
  },
  date: {
    color: '#999999'
  },
  paidUser: {
    color: '#5bc5a7',
    fontWeight: 'bold'
  },
  container: {
    maxHeight: '100vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    cursor: 'pointer'
  },
  wrapText: {
    overflowWrap: 'break-word'
  }
});

const ActiveExpenses = () => {
  const dispatch = useDispatch();
  const [txnSummary, setTxnSummary] = useState({});
  const [id, setId] = useState('');
  const { loading, data } = useQuery(GET_ACTIVE_TRANSACTIONS, {
    variables: { userId: localStorage.getItem(USER_ID) }
  });
  const isSettleTransaction = useSelector(({ reducers }) => reducers.showSettleTransaction);

  const handlePayExpense = e => {
    setId(e.target.id);
    dispatch(handleShowSettleTransaction(isSettleTransaction));
  };

  const handleTxnSummary = e => {
    if (e.target.tagName === 'DIV') {
      const id = e.currentTarget.id;
      const newTxnSummary = { ...txnSummary };
      newTxnSummary[id] = !newTxnSummary[id];
      setTxnSummary(newTxnSummary);
    }
  };

  useEffect(() => {
    if (data) {
      const txnObj = {};
      data.activeTransactions.forEach(txn => {
        txnObj[txn.id] = false
      });
      setTxnSummary(txnObj);
    }
  }, [data]);

  const classes = useStyles();

  if (loading) return <LinearProgress color='primary' />

  return (
    <>
      <Box display='flex' flexDirection='column' className={classes.container}>
        {data &&
          data.activeTransactions.map((transaction, i) => {
            if (transaction.paidOn) {
              return (
                <Box key={i} id={transaction.id} onClick={handleTxnSummary}>
                  <Box className={classes.transactionsNotification}>
                    <Box display='flex' alignItems='center' flexBasis='10%'>
                      <Avatar className={classes.avatar}>GF</Avatar>
                    </Box>
                    <Box flexDirection='column' flexBasis='90%'>
                      <div className={classes.wrapText}>
                        <span className={classes.bold}>You</span> paid <span className={classes.bold}>{transaction.expense.user.firstName} {transaction.expense.user.lastName}</span> for the "
                        <span className={classes.bold}>{transaction.expense.description}
                        </span>" expense
                      </div>
                      <div className={classes.paidUser}>
                        You paid ${transaction.amount.toFixed(2)}
                      </div>
                      <div className={classes.date}>
                        {timeDifferenceForDate(transaction.paidOn)}
                      </div>
                    </Box>
                  </Box>
                  {txnSummary[transaction.id] &&
                    <Box>
                      <ExpenseComments expenseId={transaction.expense.id} />
                    </Box>
                  }
                </Box>
              )
            }
            else {
              return (
                <Box key={i} id={transaction.id} onClick={handleTxnSummary}>
                  <Box className={classes.transactionsNotification}>
                    <Box display='flex' alignItems='center' flexBasis='10%'>
                      <Avatar className={classes.avatar}>GF</Avatar>
                    </Box>
                    <Box flexDirection='column' flexBasis='80%'>
                      <div className={classes.wrapText}>
                        <span className={classes.bold}>
                          {transaction.expense.user.firstName} {transaction.expense.user.lastName}
                        </span> added you to the "<span className={classes.bold}>{transaction.expense.description}
                        </span>" expense
                      </div>
                      <div className={classes.oweUser}>
                        You owe ${transaction.amount.toFixed(2)}
                      </div>
                      <div className={classes.date}>
                        {timeDifferenceForDate(transaction.expense.createdAt)}
                      </div>
                    </Box>
                    <Box justifyContent='flex-end' flexBasis='10%'>
                      <Button
                        variant='contained'
                        size='small'
                        color='primary'
                        onClick={handlePayExpense}
                        id={transaction.id}
                      >
                        Pay
                      </Button>
                    </Box>
                  </Box>
                  {txnSummary[transaction.id] &&
                    <Box>
                      <ExpenseComments expenseId={transaction.expense.id} />
                    </Box>
                  }
                  {isSettleTransaction && <SettleTransaction id={transaction.id} />}
                </Box>
              )
            }
          })
        }
      </Box>
    </>
  );
};

export default ActiveExpenses;
