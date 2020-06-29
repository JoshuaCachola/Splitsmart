import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Box, makeStyles, Button, Avatar, LinearProgress } from '@material-ui/core';

import { GET_RECENT_ACTIVITY, GET_FRIENDS } from '../../../gql/queries';
import { HANDLE_FRIEND_REQUEST } from '../../../gql/mutations';
import { USER_ID } from '../../../utils/constants';
import { sortByDate, timeDifferenceForDate } from '../../../utils/utilFunc';
import { theme } from '../../../theme';

const useStyles = makeStyles({
  transactionsNotification: {
    display: 'flex',
    borderBottom: '1px solid #ddd',
    padding: '16px',
    fontSize: '16px',
    lineHeight: '21px',
    minHeight: '40px',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: '#f6f6f6'
    }
  },
  bold: {
    fontWeight: 'bold'
  },
  container: {
    borderBottom: '1px solid #ddd',
    maxHeight: '100vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: '5px'
  },
  wrapText: {
    overflowWrap: 'break-word'
  },
  text: {
    marginLeft: '8px'
  },
  date: {
    color: '#999999',
  },
  oweUser: {
    color: '#FF652F',
    fontWeight: 'bold'
  },
  paidUser: {
    color: '#5bc5a7',
    fontWeight: 'bold'
  }
})
const RecentActivity = () => {
  const [sortedActivity, setSortedActivity] = useState(false);
  const { loading, error, data } = useQuery(GET_RECENT_ACTIVITY, {
    variables: { userId: localStorage.getItem(USER_ID) }
  });
  const [handleFriendRequest] = useMutation(HANDLE_FRIEND_REQUEST);

  const handleReject = e => {
    const id = e.currentTarget.name;
    handleFriendRequest({
      variables: {
        id,
        status: 'rejected'
      },
      refetchQueries: [{
        query: GET_RECENT_ACTIVITY,
        variables: { userId: localStorage.getItem(USER_ID) }
      }, {
        query: GET_FRIENDS,
        variables: { friendId: localStorage.getItem(USER_ID) }
      }]
    });
  };

  const handleAccept = e => {
    const id = e.currentTarget.name;
    handleFriendRequest({
      variables: {
        id,
        status: 'accepted'
      },
      refetchQueries: [{
        query: GET_RECENT_ACTIVITY,
        variables: { userId: localStorage.getItem(USER_ID) }
      }]
    })
  };

  useEffect(() => {
    if (data) {
      setSortedActivity(sortByDate(data.recentActivity));
    }
  }, [data]);

  const classes = useStyles();

  if (loading) {
    return <LinearProgress color='primary' />
  }
  return (
    <Box className={classes.container}>
      {sortedActivity &&
        sortedActivity.map((activity, i) => {
          if (activity.__typename === 'Friendship') {
            if (activity.status === 'pending') {
              if (activity.friend1.id === localStorage.getItem(USER_ID)) {
                return (
                  <Box key={i} display='flex' className={classes.transactionsNotification}>
                    <Box flexBasis='10%'>
                      <Avatar className={classes.avatar}>SS</Avatar>
                    </Box>
                    <Box flexBasis='90%' flexDirection='column'>
                      <div className={classes.wrapText}><span className={classes.bold}>You</span> <span className={classes.oweUser}>requested</span> to be friends with <span className={classes.bold}>{activity.friend2.firstName} {activity.friend2.lastName}</span></div>
                      <div className={classes.date}>{timeDifferenceForDate(activity.updatedAt)}</div>
                    </Box>
                  </Box>
                )
              } else {
                return (
                  <Box
                    key={i}
                    display='flex'
                    className={classes.transactionsNotification}
                  >
                    <Box flexBasis='10%'>
                      <Avatar className={classes.avatar}>SS</Avatar>
                    </Box>
                    <Box flexBasis='90%' flexDirection='column' className={classes.text}>
                      <div className={classes.wrapText}><span className={classes.bold}>{activity.friend2.firstName} {activity.friend2.lastName}</span> <span className={classes.oweUser}>requested</span> to be friends with <span className={classes.bold}>you</span>.</div>
                      <div className={classes.date}>{timeDifferenceForDate(activity.updatedAt)}</div>
                    </Box>
                    <Box display='flex'>
                      <Button
                        size='small'
                        color='secondary'
                        onClick={handleReject}
                        name={activity.id}
                        height='50%'
                      >
                        Reject
                      </Button>
                      <Button
                        size='small'
                        variant='contained'
                        color='primary'
                        onClick={handleAccept}
                        name={activity.id}
                        height='50%'
                      >
                        Accept
                    </Button>
                    </Box>
                  </Box>
                )
              }
            } else if (activity.status === 'accepted') {
              if (activity.friend1.id === localStorage.getItem(USER_ID)) {
                return (
                  <Box key={i} className={classes.transactionsNotification}>
                    <Box flexBasis='10%'>
                      <Avatar className={classes.avatar}>SS</Avatar>
                    </Box>
                    <Box flexBasis='90%' flexDirection='column'>
                      <div className={classes.wrapText}><span className={classes.bold}>You</span> <span className={classes.paidUser}>accepted</span> to be friends with <span className={classes.bold}>{activity.friend2.firstName} {activity.friend2.lastName}</span></div>
                      <div className={classes.date}>{timeDifferenceForDate(activity.updatedAt)}</div>
                    </Box>
                  </Box>
                )
              } else {
                return (
                  <Box key={i} className={classes.transactionsNotification}>
                    <Box flexBasis='10%' >
                      <Avatar className={classes.avatar}>SS</Avatar>
                    </Box>
                    <Box flexBasis='90%' flexDirection='column'>
                      <div className={classes.wrapText}><span className={classes.bold}>{activity.friend2.firstName} {activity.friend2.lastName}</span> <span className={classes.paidUser}>accepted</span> to be friends with <span className={classes.bold}>you</span>.</div>
                      <div className={classes.date}>{timeDifferenceForDate(activity.updatedAt)}</div>
                    </Box>
                  </Box>
                )
              }
            }
          } else {
            if (activity.paidOn) {
              return (
                <Box key={i} id={activity.id}>
                  <Box
                    display='flex'
                    alignItems='center'
                    flexBasis='10%'
                    className={classes.transactionsNotification}
                  >
                    <Avatar className={classes.avatar}>GF</Avatar>
                    <Box flexDirection='column' flexBasis='90%'>
                      <div className={classes.wrapText}>
                        <span className={classes.bold}>You</span> paid <span className={classes.bold}>{activity.expense.user.firstName} {activity.expense.user.lastName}</span> for the "
                        <span className={classes.bold}>{activity.expense.description}
                        </span>" expense
                      </div>
                      <div className={classes.paidUser}>
                        You paid ${activity.amount.toFixed(2)}
                      </div>
                      <div className={classes.date}>
                        {timeDifferenceForDate(activity.paidOn)}
                      </div>
                    </Box>
                  </Box>
                </Box>
              )
            } else {
              return (
                <Box key={i} id={activity.id}>
                  <Box
                    display='flex'
                    alignItems='center'
                    flexBasis='10%'
                    className={classes.transactionsNotification}
                  >
                    <Avatar className={classes.avatar}>GF</Avatar>
                    <Box flexDirection='column' flexBasis='90%'>
                      <div className={classes.wrapText}>
                        <span className={classes.bold}>
                          {activity.expense.user.firstName} {activity.expense.user.lastName}
                        </span> added you to the "<span className={classes.bold}>{activity.expense.description}
                        </span>" expense
                      </div>
                      <div className={classes.oweUser}>
                        You owe ${activity.amount.toFixed(2)}
                      </div>
                      <div className={classes.date}>
                        {timeDifferenceForDate(activity.expense.createdAt)}
                      </div>
                    </Box>
                  </Box>
                </Box>
              )
            }
          }
        })
      }
    </Box>
  );
};

export default RecentActivity;
