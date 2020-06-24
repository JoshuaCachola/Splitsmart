import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const SplitExpense = () => {
  const friends = useSelector(state => state.reducers.yourFriends)

  // useEffect(() => {
  //   console.log(friends);
  // }, [friends])
  console.log(friends);
  return (
    <>
      <h1>Split Expense</h1>
      {friends &&
        friends.map((friend, i) => {
          return (
            <div key={i}>
              <table>
                <thead>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </thead>
                <tbody>
                  <td>{friend.firstName}</td>
                  <td>{friend.lastName}</td>
                  <td>{friend.email}</td>
                  <td><Button>Split</Button></td>
                </tbody>
              </table>
            </div>
          )
        })
      }
    </>
  );
};

export default SplitExpense;
