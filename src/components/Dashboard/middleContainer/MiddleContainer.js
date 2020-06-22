import React from 'react';

import Topbar from './Topbar';
import ActiveExpenses from './ActiveExpenses';

const MiddleContainer = () => {
  return (
    <>
      {/* Topbar */}
      <Topbar />
      {/* Active Expenses */}
      <ActiveExpenses />
    </>
  )
};

export default MiddleContainer;
