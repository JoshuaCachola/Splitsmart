import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  iconContainer: {
    border: '1px solid #e6e6e6',
    borderRadius: '25%',
    cursor: 'pointer',
    margin: '10px 0 0 5px',
    width: '30px',
    height: '30px',
    backgroundColor: '#FFFFFF'
  },
  icons: {
    padding: '4px 0 4px 5px',
    fontSize: '18px',
    color: '#999999',
    '&:hover': {
      color: '#5bc5a7'
    }
  },
  icon1: {
    padding: '4px 0 4px 3px',
    fontSize: '18px',
    color: '#999999',
    '&:hover': {
      color: '#5bc5a7'
    }
  }
})
const RightContainer = () => {
  const classes = useStyles();
  return (
    <Box display='flex' m={1}>
      <div className={classes.iconContainer}><span className={`fas fa-balance-scale ${classes.icon1}`}></span></div>
      <div className={classes.iconContainer}><span className={`fas fa-calendar-alt ${classes.icons}`}></span></div>
      <div className={classes.iconContainer}><span className={`far fa-chart-bar ${classes.icons}`}></span></div>
    </Box >
  );
};

export default RightContainer;
