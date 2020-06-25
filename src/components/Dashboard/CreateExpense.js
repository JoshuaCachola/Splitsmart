import React, { useState } from 'react';
import { makeStyles, Button, Box, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import { CREATE_EXPENSE } from '../../gql/mutations';
import { USER_ID } from '../../utils/constants';
import FriendsList from './FriendsList';

const useStyles = makeStyles({
  expenseForm: {

  },
  label: {
    verticalAlign: 'middle'
  }
});

const CreateExpense = ({ history }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
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

  const classes = useStyles();
  return (
    <>
      <h1>Add an expense</h1>
      <form>
        <Box display='flex' flexDirection='column'>
          <Box display='flex'>
            <span className={classes.label}>Description</span>
            <TextField
              type='text'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Box>
          <Box display='flex'>
            <span className={classes.label}>Amount</span>
            <TextField
              type='text'
              value={amount}
              placeholder='$0.00'
              onChange={e => setAmount(e.target.value)}
            />
          </Box>
          <Button
            variant='contained'
            type='button'
            onClick={handleCreateExpense}
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
        </Box>
      </form>
      <FriendsList />
    </>
  );
};

export default withRouter(CreateExpense);
