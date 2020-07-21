import React from 'react';
import { Box, makeStyles, Container } from '@material-ui/core';

import PersonalLinks from './PersonalLinks';

const useStyles = makeStyles({
  iconContainer: {
    border: '1px solid #e6e6e6',
    borderRadius: '25%',
    cursor: 'pointer',
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
  },
  personalLinks: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '80%',
  },
})
const RightContainer = () => {
  const classes = useStyles();
  return (
    <Box m={1} height='100%'>
      <Box display='flex' p={2}>
        <div className={classes.iconContainer}><span className={`fas fa-balance-scale ${classes.icon1}`}></span></div>
        <div className={classes.iconContainer}><span className={`fas fa-calendar-alt ${classes.icons}`}></span></div>
        <div className={classes.iconContainer}><span className={`far fa-chart-bar ${classes.icons}`}></span></div>
      </Box>
      <Container className={classes.personalLinks}>
        <PersonalLinks />
      </Container>
    </Box>
  );
};

export default RightContainer;
