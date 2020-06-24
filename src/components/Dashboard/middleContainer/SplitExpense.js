import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const SplitExpense = () => {
  const friends = useSelector(state => state.reducers.yourFriends)

  // useEffect(() => {
  //   console.log(friends);
  // }, [friends])
  // console.log(friends);
  return (
    <>
      <h1>Split Expense</h1>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
        <tbody>
          {friends &&
            friends.map((friend, i) => {
              return (
                <tr key={i}>
                  <td>{friend.friend2.firstName}</td>
                  <td>{friend.friend2.lastName}</td>
                  <td><Button>Split</Button></td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  );
};

export default SplitExpense;
