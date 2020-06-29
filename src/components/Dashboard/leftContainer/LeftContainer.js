import React from 'react';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Friends from './Friends';
import { useSelector, useDispatch } from 'react-redux';

import { theme } from '../../../theme';
import {
  handleShowDashboard,
  handleShowRecentActivity,
  handleShowAllExpenses
} from '../../../redux-store/actions';

const styles = {
  leftContainer: {
    marginTop: '11px',
    marginLeft: '230px',
    maxWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  navigation: {
    width: '172px',
    marginLeft: '2px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: '#999',
  },
  dashboard: {
    margin: '11px 0 0',
    padding: '3px 8px 5px 5px',
    fontSize: '16px',
    lineHeight: '21px',
    cursor: 'pointer'
  },
  recentActivity: {
    padding: '3px 8px 5px 5px',
    fontSize: '16px',
    lineHeight: '21px',
    cursor: 'pointer'
  },
  allExpenses: {
    color: 'inherit',
    display: 'block',
    height: '19px',
    fontSize: '14px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    paddingLeft: '5px',
    textDecoration: 'none',
    marginTop: '10px',
    cursor: 'pointer'
  },
  active: {
    color: '#5BC5A7',
    fontWeight: 'bold',
    borderLeft: '6px solid #5BC5A7',
    paddingLeft: '5px'
  },
  inactive: {
    color: '#999999',
  }
}

const LeftContainer = (props) => {
  const dispatch = useDispatch();
  const isDashboard = useSelector(({ reducers }) => reducers.showDashboard);
  const isRecentActivity = useSelector(({ reducers }) => reducers.showRecentActivity);
  const isAllExpenses = useSelector(({ reducers }) => reducers.showAllExpenses);

  const _allOff = () => {
    dispatch(handleShowDashboard(false));
    dispatch(handleShowRecentActivity(false));
    dispatch(handleShowAllExpenses(false));
  };

  const handleIsDashboard = () => {
    _allOff();
    dispatch(handleShowDashboard(true));
  };

  const handleIsRecentActivity = () => {
    _allOff();
    dispatch(handleShowRecentActivity(true));
  };

  const handleIsAllExpenses = () => {
    _allOff();
    dispatch(handleShowAllExpenses(true));
  };

  const { classes } = props;
  return (
    <Box className={classes.leftContainer}>
      <Box justifyContent='flex-end'>
        <Box className={classes.navigation}>
          <div
            className={classes.dashboard}
            onClick={handleIsDashboard}
          >
            <span className={`${isDashboard ? classes.active : classes.inactive}`}>
              <i className="fas fa-border-all"></i> Dashboard</span>
          </div>
          <div
            className={classes.recentActivity}
            onClick={handleIsRecentActivity}
          >
            <span className={`${isRecentActivity ? classes.active : classes.inactive}`}>
              <i className="fab fa-font-awesome-flag"></i> Recent activity</span>
          </div>
          <div
            className={classes.allExpenses}
            onClick={handleIsAllExpenses}
          >
            <span className={`${isAllExpenses ? classes.active : classes.inactive}`}>
              <i className="fas fa-bars"></i> All expenses</span>
          </div>
          <Box>
            <Friends />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default withStyles(styles)(LeftContainer);
