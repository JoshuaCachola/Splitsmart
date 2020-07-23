import React from 'react';
import { Container, Box, makeStyles } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import WebIcon from '@material-ui/icons/Web';

const useStyles = makeStyles({
  linkIcons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '75%',
    flexDirection: 'flex-start',
  },
  icons: {
    fontSize: '32px',
    color: '#999999',
    cursor: 'pointer',
    '&:hover': {
      color: '#5bc5a7'
    }
  },
  linksContainer: {
    marginTop: 'auto'
  },
  developerHeader: {
    textAlign: 'center',
    marginTop: '10px',
    color: '#999999'
  }
});

const PersonalLinks = () => {
  const classes = useStyles();
  return (
    <Container className={classes.linksContainer}>
      {/* <Container>Personal Links</Container> */}
      <Container className={classes.linkIcons}>
        <a href='https://github.com/JoshuaCachola/Splitsmart'>
          <GitHubIcon className={classes.icons} />
        </a>
        <a href='https://www.linkedin.com/in/joshua-cachola-b6bab9194/'>
          <LinkedInIcon className={classes.icons} />
        </a>
        <a href='https://joshuacachola.github.io/'>
          <WebIcon className={classes.icons} />
        </a>
      </Container>
      <Container className={classes.developerHeader}>Developed by - Joshua Cachola</Container>
    </Container>
  );
};

export default PersonalLinks;
