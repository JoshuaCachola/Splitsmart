import React from 'react';
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
import { theme } from '../theme';

const options = ['Your account', 'Create a group', 'Log out'];

const useStyles = makeStyles({
  navContainer: {
    maxWidth: '100%',
    // justifyContent: 'space-between',
    backgroundColor: '#5BC5A7',
    bottomBorder: '1px solid #48be9d',
    boxShadow: '0 0 3px rgba(0,0,0,0.5)'
  },
  innerContainer: {
    width: '80%',
    justifyContent: 'center'
  },
  avatar: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5)
  }
});

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
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

  const classes = useStyles();

  return (
    <nav>
      <Box className={classes.navContainer}>
        <Box display='flex' justifyContent='space-between' className={classes.navContainer}>
          <Box>
            GoodFellas
          </Box>
          <Box display='flex' alignItems='center'>
            <Avatar className={classes.avatar}>GF</Avatar>
            <ButtonGroup variant='text' ref={anchorRef} aria-label="split button">
              <Button onClick={handleClick}>{options[selectedIndex]}</Button>
              <Button
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
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
                            disabled={index === 2}
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

export default Navbar;
