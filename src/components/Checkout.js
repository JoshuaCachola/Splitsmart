import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import {
  TextField,
  InputLabel,
  makeStyles,
  Button,
  Box,
  Container,
  Paper,
} from '@material-ui/core';

import { CREATE_TRANSACTION } from '../gql/mutations';
import { USER_ID, VENMO, PAYPAL, CHECKOUT_PAYMENT_TYPE } from '../utils/constants';

const useStyles = makeStyles({
  root: {
    position: 'relative'
  },
  checkoutContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-evenly',
    border: '1px solid #F8F8F8',
    maxWidth: '80vw',
    minHeight: '60vh',
    boxShadow: '0 0 12px rgba(0,0,0,0.2)',
    top: '50%',
  },
  label: {
    marginTop: 'auto'
  },
  paymentContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '100px',
    width: '35%',
  },
  paypalLogo: {
    width: '25%',
    height: '25%',
    margin: '30px 0 30px 30px',
  },
  venmoLogo: {
    width: '20%',
    height: '20%',
    backgroundColor: '#3d95ce',
    border: '1px solid #3d95ce',
    margin: '30px 0 30px 30px',
    borderRadius: '5px'
  },
  submitButton: {
    backgroundColor: '#3d95ce',
    color: '#FFFFFF'
  },
  paymentHeader: {
    fontWeight: 'bold',
    fontSize: '18px',
    textAlign: 'center'
  },
  // inputColor: {
  //   '&:focus': {
  //     color: '#3d95ce'
  //   }
  // }
  paymentDetails: {
    backgroundColor: '#FAFAFA',
    width: '350px',
    height: '210px',
    margin: 'auto 0',
    display: 'flex',
    flexDirection: 'column'
  },
  paymentText: {
    fontWeight: 'bold'
  },
  paymentTextContainer: {
    display: 'flex',
    margin: 'auto 20px',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ECECEC'
  }
});

const Checkout = () => {
  const [name, setName] = useState('Demo User'),
    [creditCard, setCreditCard] = useState('1234567890101112'),
    [expDate, setExpDate] = useState('01/21'),
    [cvv, setCvv] = useState('000'),
    [errors, setErrors] = useState([]);

  const paymentType = useSelector(({ reducers }) => reducers.paymentType);
  const currentTransaction = useSelector(({ reducers }) => reducers.currentTransaction);
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
          expenseId: currentTransaction.expenseId,
          amount: currentTransaction.amount
        }
      });
    }

    setName('');
    setCreditCard('');
    setExpDate('');
    setCvv('');
  };

  const checkoutLogo = () => {
    if (paymentType === VENMO || localStorage.getItem(CHECKOUT_PAYMENT_TYPE) === VENMO) {
      return (
        <div>
          <img className={classes.venmoLogo} src="venmo.png" alt="venmo-logo" />
        </div>
      )
    } else if (paymentType === PAYPAL || localStorage.getItem(CHECKOUT_PAYMENT_TYPE) === PAYPAL) {
      return (
        <div>
          <img className={classes.paypalLogo} src="paypal.png" alt="venmo-logo" />
        </div>
      )
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {checkoutLogo()}
      <Container className={classes.checkoutContainer}>
        <Box className={classes.paymentContainer}>
          <form>
            <Box mb={3} display='flex' justifyContent='space-between'>
              <InputLabel className={classes.label}>Name on card</InputLabel>
              <TextField
                type='text'
                value={name}
                required={true}
                size='medium'
                // InputProps={{ className: classes.inputColor }}
                onChange={e => setName(e.target.value)}
              />
            </Box>
            <Box mb={3} display='flex' justifyContent='space-between'>
              <InputLabel className={classes.label}>Credit card number</InputLabel>
              <TextField
                type='text'
                value={creditCard}
                required={true}
                size='medium'
                // InputProps={{ className: classes.inputColor }}
                onChange={e => setCreditCard(e.target.value)}
              />
            </Box>
            <Box mb={3} display='flex' justifyContent='space-between'>
              <InputLabel className={classes.label}>Expiration date</InputLabel>
              <TextField
                type='text'
                value={expDate}
                required={true}
                size='medium'
                // InputProps={{ className: classes.inputColor }}
                onChange={e => setExpDate(e.target.value)}
              />
            </Box>
            <Box mb={3} display='flex' justifyContent='space-between'>
              <InputLabel className={classes.label}>CVV</InputLabel>
              <TextField
                type='text'
                value={cvv}
                required={true}
                size='medium'
                // InputProps={{ className: classes.inputColor }}
                onChange={e => {
                  if (cvv.length !== 3) {
                    setCvv(e.target.value)
                  }
                }}
              />
            </Box>
          </form>
        </Box>
        <Paper className={classes.paymentDetails}>
          <h2 className={classes.paymentHeader}>Transaction Details</h2>
          <Box className={classes.paymentTextContainer}>
            <div className={classes.paymentText}>Payment to:</div>
            <div>Joshua Cachola</div>
          </Box>
          <Box className={classes.paymentTextContainer}>
            <div className={classes.paymentText}>Payment description:</div>
            <div>Camping</div>
          </Box>
          <Box className={classes.paymentTextContainer}>
            <div className={classes.paymentText}>Amount to be paid:</div>
            <div>$100</div>
          </Box>
        </Paper>
      </Container>
      <Box mt={3} display='flex' justifyContent='center'>
        <Button
          variant='contained'
          type='submit'
          onSubmit={handleCreateTransaction}
          className={classes.submitButton}
        >
          Make payment
            </Button>
      </Box>
    </div >
  );
};

export default Checkout;
