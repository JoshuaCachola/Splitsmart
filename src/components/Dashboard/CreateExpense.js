import React, { useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_EXPENSE } from '../../gql/mutations';
import { USER_ID } from '../../utils/constants';
import history from '../../utils/history';

const useStyles = makeStyles({
  expenseForm: {

  }
});

const CreateExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [createExpense, _] = useMutation(CREATE_EXPENSE);

  const handleCreateExpense = () => {
    // e.preventDefault();
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
      <h1>CreateExpense</h1>
      <form>
        <label>Description</label>
        <input
          type='text'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <label>Amount</label>
        <input
          type='text'
          value={amount}
          placeholder='$0.00'
          onChange={e => setAmount(e.target.value)}
        />
        <Button type='button' onClick={handleCreateExpense}>Create Expense</Button>
      </form>
    </>
  );
};

export default CreateExpense;
