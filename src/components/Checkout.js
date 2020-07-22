import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  TextField,
  InputLabel,
  makeStyles,
  Button
} from '@material-ui/core';

import { CREATE_TRANSACTION } from '../gql/mutations';
import { USER_ID } from '../utils/constants';

const useStyles = makeStyles({

});

const Checkout = ({ expenseId, amount }) => {
  const [name, setName] = useState(''),
    [creditCard, setCreditCard] = useState(''),
    [expDate, setExpDate] = useState(''),
    [cvv, setCvv] = useState(''),
    [errors, setErrors] = useState([]);

  const [createTransaction] = useMutation(CREATE_TRANSACTION);

  const handleCreateTransaction = e => {
    e.preventDefault();
    setErrors([]);
    const splitName = name.split();
    if (splitName.length < 2) {
      errors.push('Please enter your full name on your credit card.');
    }
    let parsedCreditCard = parseInt(creditCard);
    parsedCreditCard = parsedCreditCard.toString()
    if (parsedCreditCard.length !== 16) {
      errors.push('Please enter a valid 16-digit credit card.')
    }
    let parsedCvv = parseInt(cvv);
    parsedCvv = parsedCvv.toString();
    if (parsedCvv.length !== 3) {
      errors.push('Please enter a valid CVV number.')
    }
    const splitExpDate = expDate.split('/');
    if (splitExpDate.length > 2 || splitExpDate[0].length !== 2 || splitExpDate[1].length !== 2) {
      errors.push('Please enter a valid expiration date with month and year separated by a "/"');
    }

    if (errors.length) {
      createTransaction({
        variables: {
          userId: localStorage.getItem(USER_ID),
          expenseId,
          amount
        }
      });
    }

    setName('');
    setCreditCard('');
    setExpDate('');
    setCvv('');
  };

  console.log(errors);
  const classes = useStyles();
  return (
    <>
      <form onSubmit={handleCreateTransaction}>
        <InputLabel>Name on card</InputLabel>
        <TextField
          type='text'
          value={name}
          required={true}
          onChange={e => setName(e.target.value)}
        />
        <InputLabel>Credit card number</InputLabel>
        <TextField
          type='text'
          value={creditCard}
          required={true}
          onChange={e => setCreditCard(e.target.value)}
        />
        <InputLabel>Expiration date</InputLabel>
        <TextField
          type='text'
          value={expDate}
          required={true}
          onChange={e => setExpDate(e.target.value)}
        />
        <InputLabel>CVV</InputLabel>
        <TextField
          type='text'
          value={cvv}
          required={true}
          onChange={e => {
            if (cvv.length !== 3) {
              setCvv(e.target.value)
            }
          }}
        />
        <Button
          variant='contained'
          type='submit'
        >
          Make payment
        </Button>
      </form>
    </>
  );
};

export default Checkout;
