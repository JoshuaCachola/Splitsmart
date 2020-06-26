import React, { useState } from 'react';
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
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CREATE_EXPENSE } from '../../gql/mutations';
import { USER_ID } from '../../utils/constants';
import FriendsList from './FriendsList';
import { handleShowSplitExpense } from '../../redux-store/actions';

const useStyles = makeStyles({
  title: {
    borderBottom: '1px solid black',
    backgroundColor: '#5BC5A7',
  },
  titleText: {
    fontWeight: 'bold',
    color: 'white'
  },
  friendsHeader: {
    verticalAlign: 'middle',
    fontSize: '14px',
    background: '#f6f6f6',
    color: '#ccc',
    borderBottom: '1px solid #eee',
    borderTop: '1px solid #f3f3f3',
  },
});

const CreateExpense = ({ history }) => {
  const dispatch = useDispatch();
  const isShowing = useSelector(({ reducers }) => reducers.showSplitExpense);
  const friends = useSelector(({ reducers }) => reducers.friendsSplitExpense);
  const [description, setDescription] = useState(''),
    [amount, setAmount] = useState('');
  const [createExpense, _] = useMutation(CREATE_EXPENSE);

  const handleCreateExpense = e => {
    e.preventDefault();
    console.log(description, amount);
    createExpense({
      variables: {
        description,
        amount,
        userId: parseInt(localStorage.getItem(USER_ID))
      }
    });
    history.push('/dashboard');
  };

  const handleClose = () => {
    dispatch(handleShowSplitExpense(isShowing));
  };

  const classes = useStyles();
  return (
    <Paper>
      <Dialog
        open={isShowing}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth='sm'
        fullWidth={true}
      >
        <Box className={classes.title}>
          <DialogTitle
            className={classes.titleText}
            id="form-dialog-title"
          >
            Add an expense
          </DialogTitle>
        </Box>
        <DialogContent>
          <Box width='80%'>
            <Box justifyContent='center'>
              <InputLabel id="expense-description-label">Description</InputLabel>
              <TextField
                type='text'
                value={description}
                onChange={e => setDescription(e.target.value)}
                fullWidth={true}
              />
              <InputLabel>Amount</InputLabel>
              <TextField
                type='text'
                value={amount}
                placeholder='$0.00'
                onChange={e => setAmount(e.target.value)}
                fullWidth={true}
              />
              <Box>
                <h2 className={classes.friendsHeader}>Friends added to expense</h2>
              </Box>
              <div>
                {friends &&
                  <FriendsList id='friends-prop' friendsList={friends} />
                }
              </div>
              <Box>
                <h2 className={classes.friendsHeader}>Your friends</h2>
              </Box>
              <div id='no-friends-prop'>
                <FriendsList id='no-friends-prop' />
              </div>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
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
            onClick={handleCreateExpense}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default withRouter(CreateExpense);
