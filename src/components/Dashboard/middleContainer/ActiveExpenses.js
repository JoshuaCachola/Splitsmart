import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles, Box, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { ACTIVE_EXPENSES } from '../../../gql/queries';
import { USER_ID } from '../../../utils/constants';
import SplitExpense from './SplitExpense';
import { handleShowSplitExpense } from '../../../redux-store/actions';
import history from '../../../utils/history';

const useStyles = makeStyles({

});

const ActiveExpenses = () => {
  const dispatch = useDispatch();
  const showSplitExpense = useSelector(
    state => state.reducers.showSplitExpense);
  const { loading, error, data } = useQuery(ACTIVE_EXPENSES, {
    variables: { userId: localStorage.getItem(USER_ID) }
  });

  const handleSplitExpense = () => {
    dispatch(handleShowSplitExpense(showSplitExpense));
  };

  console.log(data);
  const classes = useStyles();
  return (
    <>
      <Box display='flex' flexDirection='column'>
        {data &&
          data.activeExpenses.map((expense, i) => {
            return (
              <div key={i}>
                <p>{expense.description}</p>
                <p>{expense.amount}</p>
                <p>{expense.createdAt}</p>
                <Button onClick={handleSplitExpense}>Split</Button>
              </div>
            );
          })
        }
      </Box>
      {showSplitExpense &&
        <SplitExpense />
      }
    </>
  );
};

export default ActiveExpenses;
