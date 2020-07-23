import React from 'react';
import { withRouter } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper
} from '@material-ui/core';

import { handleShowSettleTransaction, handlePaymentType } from '../../../redux-store/actions';
import { HANDLE_TRANSACTION } from '../../../gql/mutations';
import { USER_ID, VENMO, PAYPAL } from '../../../utils/constants';
import { GET_RECENT_ACTIVITY, GET_ACTIVE_TRANSACTIONS } from '../../../gql/queries';

const useStyles = makeStyles({
  title: {
    borderBottom: '1px solid black',
    backgroundColor: '#5BC5A7',
  },
  titleText: {
    fontWeight: 'bold',
    color: 'white'
  },
  image: {
    width: '50%'
  },
  venmoButton: {
    backgroundColor: '#3d95ce',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  paypalButton: {
    margin: '5px',
    cursor: 'pointer'
  }
});

const SettleTransaction = ({ id, history }) => {
  const dispatch = useDispatch();
  const isSettleTransaction = useSelector(({ reducers }) => reducers.showSettleTransaction);

  const handleClose = () => {
    dispatch(handleShowSettleTransaction(isSettleTransaction));
  };

  const [handleTransaction] = useMutation(HANDLE_TRANSACTION, {
    refetchQueries: [{
      query: GET_RECENT_ACTIVITY,
      variables: { userId: localStorage.getItem(USER_ID) }
    }, {
      query: GET_ACTIVE_TRANSACTIONS,
      variables: {
        userId: localStorage.getItem(USER_ID)
      }
    }]
  });

  const handlePayment = () => {
    handleTransaction({
      variables: {
        id
      }
    });
    handleClose();
  };

  const handleOnlinePayment = e => {
    const type = e.currentTarget.name;
    if (type === PAYPAL) {
      dispatch(handlePaymentType(PAYPAL));
    } else {
      dispatch(handlePaymentType(VENMO));
    }

    history.push('/checkout');
  };

  const classes = useStyles();
  return (
    <Paper>
      <Dialog
        open={isSettleTransaction}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth='xs'
        fullWidth={true}
      >
        <Box className={classes.title}>
          <DialogTitle
            className={classes.titleText}
            id="form-dialog-title"
          >
            Pay for expense
            </DialogTitle>
        </Box>
        <DialogContent>
          <Box>
            <h2>Choose a payment method</h2>
          </Box>
          <Box display='flex' flexDirection='column'>
            <Button
              variant='contained'
              type='button'
              color='primary'
              onClick={handleClose}
              className={classes.buttons}
            >
              Record a cash payment
            </Button>
            <Button
              variant='outlined'
              className={classes.paypalButton}
              onClick={handleOnlinePayment}
              name='paypal'
            >
              <img className={classes.image} src='paypal.png' alt='paypal' />
            </Button>
            <button
              variant='contained'
              className={classes.venmoButton}
              onClick={handleOnlinePayment}
              name='venmo'
            >
              <img className={classes.image} src='venmo.png' alt='venmo' />
            </button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box display='flex' justifyContent='flex-end'>
            <Button
              variant='contained'
              type='button'
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              type='button'
              color='primary'
              onClick={handlePayment}
            >
              Pay
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default withRouter(SettleTransaction);
