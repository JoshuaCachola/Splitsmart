import React from 'react';
import { Box, makeStyles, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import LogIn from './LogIn';

const useStyles = makeStyles((theme) => ({
  headerLogo: {
    width: '30px',
    height: '30px',
    marginTop: '10px',
  },
  login: {
    backgroundColor: 'white',
    minHeight: '100vh',
    justifyContent: 'center'
  },
  nav: {
    backgroundColor: `${theme.palette.primary.main}`,
    maxWidth: '100%',
    display: 'flex',
    bottomBorder: '1px solid #48be9d',
    boxShadow: '0 0 3px rgba(0,0,0,0.5)',
  },
  button: {
    color: 'white'
  },
  textLogo: {
    color: 'white'
  },
  navContent: {
    width: '80%',
    justifyContent: 'space-between',
    margin: 'auto auto',
    display: 'flex'
  },
  loginContainer: {
    marginTop: '100px'
  }
}));

const Homepage = ({ history }) => {
  const classes = useStyles();
  return (
    <>
      <header>
        <nav className={classes.nav}>
          {/* <Box
          className={classes.nav}
        > */}
          <Box className={classes.navContent}>
            <Box display='flex'>
              <img
                src='logo.svg'
                alt='homepage-pic'
                className={classes.headerLogo}></img>
              <h2 className={classes.textLogo}>Splitsmart</h2>
            </Box>
            <Box display='flex' alignItems='center'>
              <Button
                className={classes.button}
                size='large'
                onClick={() => history.push('/signup')}
              >
                Sign up
              </Button>
            </Box>
          </Box>
          {/* </Box> */}
        </nav>
      </header>
      <Box display='flex' className={classes.login}>
        <Box flexBasis='40%'>
          <img src='homepage.jpg' alt='homepage-pic'></img>
        </Box>
        <Box flexBasis='20%' className={classes.loginContainer}>
          <LogIn />
        </Box>
      </Box>
    </>
  )
};

export default withRouter(Homepage);
