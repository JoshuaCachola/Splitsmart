import React, { useState, useEffect } from 'react';
import { Box, makeStyles, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { handleShowSplitExpense, handleShowSettleUp } from '../../../redux-store/actions';
import CreateExpense from '../CreateExpense';
import SettleUp from '../../../SettleUp';

const useStyles = makeStyles({
  topbar: {
    backgroundColor: '#EEEEEE',
    minHeight: '64px',
    borderBottom: '1px solid #ddd'
  },
  header: {
    verticalAlign: 'middle',
    fontSize: '24px',
    paddingLeft: '15px',
    height: '38px',
    lineHeight: '38px',
    maxWidth: '315px'
  },
  buttons: {
    lineHeight: '18px',
    marginLeft: '7px',
    padding: '9px 14px'
  }
});

const Topbar = () => {
  const dispatch = useDispatch();
  const [header, setHeader] = useState('');
  const isSplitExpense = useSelector(({ reducers }) => reducers.showSplitExpense);
  const isSettleUp = useSelector(({ reducers }) => reducers.showSettleUp);
  const isDashboard = useSelector(({ reducers }) => reducers.showDashboard);
  const isRecentActivity = useSelector(({ reducers }) => reducers.showRecentActivity);
  const isAllExpenses = useSelector(({ reducers }) => reducers.showAllExpenses);
  const handleSplitExpense = () => {
    dispatch(handleShowSplitExpense(isSplitExpense));
  };
  const handleSettleUp = () => {
    dispatch(handleShowSettleUp(isSettleUp));
  };

  const classes = useStyles();

  useEffect(() => {
    if (isDashboard) {
      setHeader('Dashboard');
    } else if (isRecentActivity) {
      setHeader('Recent activity');
    } else if (isAllExpenses) {
      setHeader('All expenses');
    }
  }, [isDashboard, isRecentActivity, isAllExpenses]);

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      className={classes.topbar}
    >
      <h1 className={classes.header}>
        {header}
      </h1>
      <Box
        display='flex'
        justifyContent='flex-end'
        alignItems='center'
      >
        <Box>
          <Button
            variant='contained'
            size='medium'
            color='secondary'
            onClick={handleSplitExpense}
          >
            Add an expense
          </Button>
        </Box>
        <Box className={classes.buttons}>
          <Button
            size='medium'
            variant='contained'
            color='primary'
            onClick={handleSettleUp}
          >
            Settle up
          </Button>
        </Box>
      </Box>
      {isSplitExpense &&
        <CreateExpense />
      }
      {isSettleUp &&
        <SettleUp />
      }
    </Box>
  )
};

export default Topbar;
