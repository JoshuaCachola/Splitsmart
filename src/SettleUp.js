import React from 'react';
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
import { useSelector, useDispatch } from 'react-redux';

import { handleShowSettleUp } from './redux-store/actions';

const useStyles = makeStyles({

});

const SettleUp = () => {
  const dispatch = useDispatch();
  const isSettleUp = useSelector(({ reducers }) => reducers.showSettleUp);
  const handleClose = () => {
    dispatch(handleShowSettleUp(isSettleUp));
  };
  const classes = useStyles();
  return (
    <Paper>
      <Dialog
        open={isSettleUp}
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
            Settle up
            </DialogTitle>
        </Box>
        <DialogContent>
          <h2>Choose a payment method</h2>
        </DialogContent>
        <DialogActions>
          <Box display='flex' flexDirection='column'>
            <Button
              variant='contained'
              type='button'
              onClick={handleClose}
            >
              Record a cash payment
            </Button>
            <button
            >
              Paypal
            </button>
            <button>
              Venmo
            </button>
          </Box>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SettleUp;
