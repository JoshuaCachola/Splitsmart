import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles, Box, Button, Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { GET_ACTIVE_TRANSACTIONS } from '../../../gql/queries';
import { USER_ID } from '../../../utils/constants';
import SplitExpense from './SplitExpense';
import { handleShowSplitExpense } from '../../../redux-store/actions';
import { theme } from '../../../theme';
import ExpenseComments from './ExpenseComments';
import { timeDifferenceForDate } from '../../../utils/utilFunc';

const useStyles = makeStyles({
  transactionsNotification: {
    display: 'flex',
    borderBottom: '1px solid #ddd',
    padding: '16px',
    fontSize: '16px',
    lineHeight: '21px',
    minHeight: '40px',
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
  }
});

const ActiveExpenses = () => {
  const dispatch = useDispatch();
  // const [openSummary, setOpenSummary] = useState(false);
  const [txnSummary, setTxnSummary] = useState({});
  // const showSplitExpense = useSelector(
  // ({ reducers }) => reducers.showSplitExpense);
  const { loading, error, data } = useQuery(GET_ACTIVE_TRANSACTIONS, {
    variables: { userId: localStorage.getItem(USER_ID) }
  });

  // const handleSplitExpense = () => {
  //   dispatch(handleShowSplitExpense(showSplitExpense));
  // };
  const handleTxnSummary = e => {
    if (e.target.tagName === 'DIV') {
      const id = e.currentTarget.id;
      console.log(e.target.tagName);
      const newTxnSummary = { ...txnSummary };
      newTxnSummary[id] = !newTxnSummary[id];
      setTxnSummary(newTxnSummary);
    }
  };

  useEffect(() => {
    if (data) {
      const txnObj = {};
      data.activeTransactions.forEach(txn => {
        console.log(txn.expense.id);
        txnObj[txn.id] = false
      });
      setTxnSummary(txnObj);
    }
  }, [data]);

  // const update = e => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };
  console.log(txnSummary);
  const classes = useStyles();
  return (
    <>
      <Box display='flex' flexDirection='column'>
        {data &&
          data.activeTransactions.map((transaction, i) => {
            if (transaction.paidOn) {
              return (
                <Box key={i} id={transaction.id} onClick={handleTxnSummary}>
                  <Box className={classes.transactionsNotification}>
                    <Box>
                      <Avatar className={classes.avatar}>GF</Avatar>
                    </Box>
                    <Box flexDirection='column'>
                      <div>
                        <span className={classes.bold}>You</span> paid <span className={classes.bold}>{transaction.user.firstName} {transaction.user.lastName}</span>
                      </div>
                      <div className={classes.paidUser}>
                        You paid ${transaction.amount.toFixed(2)}
                      </div>
                      <div className={classes.date}>
                        {transaction.paidOn}
                      </div>
                    </Box>
                  </Box>
                  {txnSummary[transaction.id] &&
                    <Box>
                      <h1>Hello</h1>
                    </Box>
                  }
                </Box>
              )
            }
            else {
              return (
                <Box key={i} id={transaction.id} onClick={handleTxnSummary}>
                  <Box className={classes.transactionsNotification}>
                    <Box display='flex' alignItems='center'>
                      <Avatar className={classes.avatar}>GF</Avatar>
                    </Box>
                    <Box flexDirection='column'>
                      <div>
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
                  </Box>
                  {txnSummary[transaction.id] &&
                    <Box>
                      <ExpenseComments expenseId={transaction.expense.id} />
                    </Box>
                  }
                </Box>
              )
            }
          })
        }
      </Box>
      {/* {
        showSplitExpense &&
        <SplitExpense />
      } */}
    </>
  );
};

export default ActiveExpenses;
