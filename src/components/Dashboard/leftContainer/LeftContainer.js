import React, { useEffect } from 'react';
import {
  Tabs,
  Tab,
  makeStyles
} from '@material-ui/core';

import Friends from './Friends';

const useStyles = makeStyles({
  root: {

  },
  tabs: {
    borderLeft: '1px solid #5BC5A7' // change to theme pallete
  }
});

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const LeftContainer = ({ data }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(data);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Friends />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="left container vertical tabs"
        className={classes.tabs}
      >
        <Tab label="Dashboard" {...a11yProps(0)} />
      </Tabs>
    </div>
  );
};

export default LeftContainer;
