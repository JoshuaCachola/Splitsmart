import React from 'react';

import Topbar from './Topbar';
import ActiveExpenses from './ActiveExpenses';
import RecentActivity from './RecentActivity';

const MiddleContainer = () => {
  return (
    <>
      {/* Topbar */}
      <Topbar />
      {/* Active Expenses */}
      <ActiveExpenses />
      <RecentActivity />
    </>
  )
};

export default MiddleContainer;
