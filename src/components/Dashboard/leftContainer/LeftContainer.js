import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  makeStyles
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Friends from './Friends';
import { theme } from '../../../theme';

const styles = {
  leftContainer: {
    marginTop: '11px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  navUnselected: {
    textAlign: 'left',
    width: '172px',
    marginLeft: '2px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: '#999',
  },
  dashUnselected: {
    margin: '11px 0 0',
    padding: '3px 8px 5px 5px',
    fontSize: '16px',
    lineHeight: '21px',
    justifyContent: 'flex-end'
  },
  actUnselected: {
    padding: '3px 8px 5px 5px',
    fontSize: '16px',
    lineHeight: '21px'
  },
  expUnselected: {
    color: 'inherit',
    display: 'block',
    height: '19px',
    fontSize: '14px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    padding: '3px 8px 2px 8px',
    textDecoration: 'none',
    borderLeft: '6px solid #fff'
  },
  navText: {
    justifyContent: 'flex-end'
  }
}

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }
const LeftContainer = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const classes = useStyles();
  const { classes } = props;
  return (
    <Box className={classes.leftContainer}>
      <Box className={classes.navUnselected}>
        <div className={classes.dashUnselected}>
          <span className={classes.navText}>Dashboard</span>
        </div>
        <div className={classes.actUnselected}>
          <span className={classes.navText}>Recent activity</span>
        </div>
        <div>
          <span className={classes.navText}>All expenses</span>
        </div>
      </Box>
      {/* <Box className={classes.root}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='left container vertical tabs'
          className={classes.tabs}
        // indicatorColor='primary'
        >
          <Tab label='Dashboard' {...a11yProps(0)} />
          <Tab label='Recent Activity' {...a11yProps(1)} />
          <Tab label='All Expenses' {...a11yProps(2)} />
        </Tabs>

        <Friends />
      </Box> */}
      <Box>
        <Friends />
      </Box>
    </Box>
  );
};

export default withStyles(styles)(LeftContainer);
// export default LeftContainer;
