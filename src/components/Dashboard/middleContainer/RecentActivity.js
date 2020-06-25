import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_RECENT_ACTIVITY } from '../../../gql/queries';
import { USER_ID } from '../../../utils/constants';
import { sortByDate } from '../../../utils/utilFunc';

const RecentActivity = () => {
  const [sortedActivity, setSortedActivity] = useState([]);
  const { loading, error, data } = useQuery(GET_RECENT_ACTIVITY, {
    variables: { userId: localStorage.getItem(USER_ID) }
  });

  useEffect(() => {
    if (data) {
      setSortedActivity(sortByDate(data.recentActivity));
    }
  }, [data]);

  console.log(data);
  return (
    <>
      {sortedActivity.length &&
        sortedActivity.map((activity, i) => {
          if (activity.expense) {
            return <p key={i}>{activity.expense.description}</p>
          } else if (activity.comment) {
            return <p key={i}>{activity.comment}</p>
          }
        })
      }
    </>
  );
};

export default RecentActivity;
