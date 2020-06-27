import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { makeStyles, Box, TextField, Button } from '@material-ui/core';

import { GET_EXPENSE_COMMENTS } from '../../../gql/queries';
import { CREATE_COMMENT } from '../../../gql/mutations';
import { USER_ID } from '../../../utils/constants';

const useStyles = makeStyles({
  comments: {
    display: 'flex',
    flexDirection: 'column'
  },
});

const ExpenseComments = ({ expenseId }) => {
  const [comment, setComment] = useState('');
  const [createExpenseComment] = useMutation(CREATE_COMMENT, {
    onCompleted() {
      setComment('');
    }
  });

  const { loading, error, data } = useQuery(GET_EXPENSE_COMMENTS, {
    variables: { expenseId }
  });

  const handleSubmitComment = () => {
    createExpenseComment({
      variables: {
        userId: localStorage.getItem(USER_ID),
        expenseId,
        comment
      },
      refetchQueries: [{
        query: GET_EXPENSE_COMMENTS,
        variables: { expenseId }
      }]
    });
  };

  const classes = useStyles();
  return (
    <>
      <Box>
        <Box className={classes.comments}>
          {data &&
            data.getExpenseComments.map((comment, i) => {
              return (
                <p key={i}>{comment.comment}</p>
              )
            })
          }
        </Box>
        <Box>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            variant="outlined"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <Button onClick={handleSubmitComment}>Add comment</Button>
        </Box>
      </Box>
    </>
  );
};

export default ExpenseComments;
