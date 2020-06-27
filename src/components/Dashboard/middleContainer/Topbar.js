import React from 'react';
import { Box, makeStyles, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
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

const Topbar = ({ history }) => {
  const dispatch = useDispatch();
  const isSplitExpense = useSelector(({ reducers }) => reducers.showSplitExpense);
  const isSettleUp = useSelector(({ reducers }) => reducers.showSettleUp);

  const handleSplitExpense = () => {
    dispatch(handleShowSplitExpense(isSplitExpense));
  };
  const handleSettleUp = () => {
    dispatch(handleShowSettleUp(isSettleUp));
  };

  const classes = useStyles();
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      className={classes.topbar}
    >
      <h1 className={classes.header}>
        Dashboard
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

export default withRouter(Topbar);
