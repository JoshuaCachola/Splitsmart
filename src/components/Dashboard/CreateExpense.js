import React, { useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_EXPENSE } from '../../gql/mutations';
import { USER_ID } from '../../utils/constants';

const useStyles = makeStyles({
  expenseForm: {

  }
});

const CreateExpense = ({ history }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0.00);
  const [createExpense, _] = useMutation(CREATE_EXPENSE);

  const handleCreateExpense = e => {
    e.preventDefault();
    createExpense({
      description,
      amount,
      userId: localStorage.getItem(USER_ID)
    })
  };

  const classes = useStyles();
  return (
    <>
      <h1>CreateExpense</h1>
      <form onSubmit={handleCreateExpense}>
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
          onChange={e => setAmount(e.target.value)}
        />
        <Button type='submit'>Create Expense</Button>
      </form>
    </>
  );
};

export default CreateExpense;
