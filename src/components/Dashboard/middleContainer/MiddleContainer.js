import React from 'react';
import { useSelector } from 'react-redux';

import Topbar from './Topbar';
import ActiveExpenses from './ActiveExpenses';
import RecentActivity from './RecentActivity';
import OpenExpenses from './OpenExpenses';

const MiddleContainer = () => {
  const isDashboard = useSelector(({ reducers }) => reducers.showDashboard);
  const isRecentActivity = useSelector(({ reducers }) => reducers.showRecentActivity);
  const isAllExpenses = useSelector(({ reducers }) => reducers.showAllExpenses);
  return (
    <>
      {/* Topbar */}
      <Topbar />
      {isDashboard && <OpenExpenses />}
      {isAllExpenses && <ActiveExpenses />}
      {isRecentActivity && <RecentActivity />}

    </>
  )
};

export default MiddleContainer;
