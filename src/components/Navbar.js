import React, { useEffect } from 'react';
import { Box, makeStyles, Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { theme } from '../theme';
import { FIRST_NAME, LAST_NAME } from '../utils/constants';

const options = ['Create a group', 'Log out'];

const useStyles = makeStyles({
  navContainer: {
    maxWidth: '100%',
    backgroundColor: '#5BC5A7',
    bottomBorder: '1px solid #48be9d',
    boxShadow: '0 0 3px rgba(0,0,0,0.5)',
  },
  avatar: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5)
  },
  headerLogo: {
    width: '30px',
    height: '30px',
    marginTop: '10px',
  },
  logoText: {
    color: 'white'
  },
  buttonColor: {
    color: 'white'
  },
  navContent: {
    width: '80%',
    justifyContent: 'space-between',
    margin: 'auto auto'
  }
});

const Navbar = ({ history }) => {
  const user = useSelector(({ reducers }) => reducers.displayUser);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    if (index === 2) {
      localStorage.clear();
      history.push('/');
    }
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (user && options[0] !== `${localStorage.getItem(FIRST_NAME)} ${localStorage.getItem(LAST_NAME)}`) {
      options.unshift(`${localStorage.getItem(FIRST_NAME)} ${localStorage.getItem(LAST_NAME)}`)
    }
  }, [user]);

  const classes = useStyles();
  return (
    <nav>
      <Box className={classes.navContainer}>
        <Box display='flex' className={classes.navContent}>
          <Box display='flex'>
            <img
              src='logo.svg'
              alt='homepage-pic'
              className={classes.headerLogo}></img>
            <h2 className={classes.logoText}> Splitsmart</h2>
          </Box>
          <Box display='flex' alignItems='center'>
            <Avatar className={classes.avatar}>GF</Avatar>
            <ButtonGroup
              variant='text'
              ref={anchorRef}
              aria-label="split button"
            >
              <Button
                className={classes.buttonColor}
                onClick={handleClick}
              >
                {options[selectedIndex]}
              </Button>
              <Button
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
                className={classes.buttonColor}
              >
                <ArrowDropDownIcon className={classes.buttonColor} />
              </Button>
            </ButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu">
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        </Box>
      </Box>
    </nav>
  )
};

export default withRouter(Navbar);
