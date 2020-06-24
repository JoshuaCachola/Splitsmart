import React, { useEffect } from 'react';
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
  tabs: {
    borderLeft: '10px solid #5BC5A7',
    padding: '3px 8px 5px 5px'
  },
  leftContainer: {
    marginTop: '11px',
  }
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const LeftContainer = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const classes = useStyles();
  const { classes } = props;
  return (
    <Box className={classes.leftContainer}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='left container vertical tabs'
        className={classes.tabs}
        indicatorColor='white'
      >
        <Tab label='Dashboard' {...a11yProps(0)} />
        <Tab label='Recent Activity' {...a11yProps(1)} />
        <Tab label='All Expenses' {...a11yProps(2)} />
      </Tabs>
      <Friends />
    </Box>
  );
};

export default withStyles(styles)(LeftContainer);
