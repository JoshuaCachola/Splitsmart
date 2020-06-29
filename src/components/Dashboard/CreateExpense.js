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
  InputLabel,
  Paper
} from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CREATE_EXPENSE, CREATE_TRANSACTION } from '../../gql/mutations';
import { USER_ID } from '../../utils/constants';
import FriendsList from './FriendsList';
import { handleShowSplitExpense } from '../../redux-store/actions';
import {
  GET_ACTIVE_TRANSACTIONS,
  GET_EXPENSE_TRANSACTIONS,
  GET_RECENT_ACTIVITY,
  GET_EXPENSE_COMMENTS,
  ACTIVE_EXPENSES
} from '../../gql/queries';

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
  inputContainer: {
    margin: '10px auto',
    width: '80%'
  }
});

const CreateExpense = () => {
  const dispatch = useDispatch();
  const isShowing = useSelector(({ reducers }) => reducers.showSplitExpense);
  const friends = useSelector(({ reducers }) => reducers.friendsSplitExpense);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [createTransaction] = useMutation(CREATE_TRANSACTION);
  const [createExpense, { loading, error }] = useMutation(CREATE_EXPENSE, {
    onCompleted({ createExpense }) {
      // console.log('in expense mutation', createExpense.expense.id);
      // setExpenseId(createExpense.expense.id);
      createTransaction({
        variables: {
          userId: parseInt(localStorage.getItem(USER_ID)),
          amount: (amount / (friends.length + 1)).toFixed(2),
          expenseId: createExpense.expense.id
        },
        refetchQueries: [{
          query: GET_RECENT_ACTIVITY,
          variables: { userId: localStorage.getItem(USER_ID) }
        }, {
          query: GET_ACTIVE_TRANSACTIONS,
          variables: { userId: localStorage.getItem(USER_ID) }
        }, {
          query: GET_EXPENSE_TRANSACTIONS,
          variables: { expenseId: createExpense.expense.id }
        }, {
          query: GET_EXPENSE_COMMENTS,
          variables: { expenseId: createExpense.expense.id }
        }, {
          query: ACTIVE_EXPENSES,
          variables: { userId: localStorage.getItem(USER_ID) }
        }]
      });
      friends.forEach(friend => {
        if (friend.friend1.id === parseInt(localStorage.getItem(USER_ID))) {
          createTransaction({
            variables: {
              userId: friend.friend1.id,
              amount: (amount / (friends.length + 1)).toFixed(2),
              expenseId: createExpense.expense.id
            },
            refetchQueries: [{
              query: GET_RECENT_ACTIVITY,
              variables: { userId: localStorage.getItem(USER_ID) }
            }, {
              query: GET_ACTIVE_TRANSACTIONS,
              variables: { userId: localStorage.getItem(USER_ID) }
            }, {
              query: GET_EXPENSE_TRANSACTIONS,
              variables: { expenseId: createExpense.expense.id }
            }, {
              query: GET_EXPENSE_COMMENTS,
              variables: { expenseId: createExpense.expense.id }
            }, {
              query: ACTIVE_EXPENSES,
              variables: { userId: localStorage.getItem(USER_ID) }
            }]
          });
        } else {
          createTransaction({
            variables: {
              userId: friend.friend2.id,
              amount: (amount / (friends.length + 1)).toFixed(2),
              expenseId: createExpense.expense.id
            },
            refetchQueries: [{
              query: GET_RECENT_ACTIVITY,
              variables: { userId: localStorage.getItem(USER_ID) }
            }, {
              query: GET_ACTIVE_TRANSACTIONS,
              variables: { userId: localStorage.getItem(USER_ID) }
            }, {
              query: GET_EXPENSE_TRANSACTIONS,
              variables: { expenseId: createExpense.expense.id }
            }, {
              query: GET_EXPENSE_COMMENTS,
              variables: { expenseId: createExpense.expense.id }
            }, {
              query: ACTIVE_EXPENSES,
              variables: { userId: localStorage.getItem(USER_ID) }
            }]
          });
        }
      });


    }
  });

  const handleCreateExpense = e => {
    e.preventDefault();
    createExpense({
      variables: {
        description,
        amount,
        userId: parseInt(localStorage.getItem(USER_ID))
      }
    });

    dispatch(handleShowSplitExpense(isShowing));
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
          <Box width='100%'>
            <Box className={classes.inputContainer}>
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
                <h2 className={classes.friendsHeader}>Friends to add to expense</h2>
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
