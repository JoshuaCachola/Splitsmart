import React from 'react';
import { Box, makeStyles, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  recentActivity: {
    display: 'flex'
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  bold: {
    fontWeight: 'bold'
  }
});

const Activity = ({ activity }) => {
  const classes = useStyles();

  return (
    <Box className={classes.recentActivity}>
      <Box>
        <Avatar className={classes.avatar}>GF</Avatar>
      </Box>
      <Box flexDirection='column'>
        <div><span>{activity.name}</span></div>
      </Box>
    </Box>
  );
};

export default Activity;
