import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Paper
} from '@material-ui/core';

import { handleShowSettleTransaction } from '../../../redux-store/actions';
import { HANDLE_TRANSACTION } from '../../../gql/mutations';
import { USER_ID } from '../../../utils/constants';
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
  button: {
    backgroundColor: '#3d95ce',
    borderRadius: '5px'
  },
  buttons: {
    margin: '5px'
  }
});

const SettleTransaction = ({ id }) => {
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
              className={classes.buttons}
            >
              <img className={classes.image} src='paypal.png' alt='paypal' />
            </Button>
            <button
              variant='contained'
              className={classes.button}
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

export default SettleTransaction;
