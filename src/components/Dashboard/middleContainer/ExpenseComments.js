import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { makeStyles, Box, TextField, Button } from '@material-ui/core';

import { GET_EXPENSE_COMMENTS } from '../../../gql/queries';
import { CREATE_COMMENT } from '../../../gql/mutations';
import { USER_ID } from '../../../utils/constants';
import { timeDifferenceForDate } from '../../../utils/utilFunc';
import ExpenseTransactions from './ExpenseTransactions';

const useStyles = makeStyles({
  comments: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '50%'
  },
  container: {
    boxShadow: 'inset 0 5px 7px -5px rgba(0,0,0,0.25), inset 0 -3px 7px -5px rgba(0,0,0,0.25)',
    backgroundColor: '#f8f8f8',
    padding: '15px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
  },
  commentContainer: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    color: '#666',
    marginBottom: '8px',
    padding: '6px 8px',
    fontSize: '11px'
  },
  usersTransactions: {
    flexBasis: '50%'
  },
  postButton: {
    width: '15px',
    marginTop: '8px',
  },
  commentsHeader: {
    margin: '8px 0 4px',
    color: '#999999',
    textSize: '12px'
  }
});

const ExpenseComments = ({ expenseId }) => {
  const [comment, setComment] = useState('');
  const [createExpenseComment] = useMutation(CREATE_COMMENT, {
    onCompleted() {
      setComment('');
    }
  });

  const { data } = useQuery(GET_EXPENSE_COMMENTS, {
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
      <Box className={classes.container}>
        <Box className={classes.usersTransactions}>
          {data &&
            <ExpenseTransactions expenseId={expenseId} />
          }
        </Box>
        <Box className={classes.comments}>
          <div className={classes.commentsHeader}>
            <span><i className="fas fa-comment"></i> NOTES AND COMMENTS</span>
          </div>
          {data &&
            data.getExpenseComments.map((comment, i) => {
              return (
                <Box key={i} className={classes.commentContainer}>
                  <div><span>{comment.user.firstName} {comment.user.lastName[0]}.</span> <span>{timeDifferenceForDate(comment.date)}</span></div>
                  <div>{comment.comment}</div>
                </Box>
              )
            })
          }
          <Box display='flex' flexDirection='column'>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              value={comment}
              placeholder='Add a comment'
              onChange={e => setComment(e.target.value)}
            />
            <Button
              variant='contained'
              color='secondary'
              size='small'
              onClick={handleSubmitComment}
              className={classes.postButton}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ExpenseComments;
