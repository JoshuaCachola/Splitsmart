import {
  SHOW_ADD_FRIENDS,
  SHOW_SPLIT_EXPENSE,
  STORE_FRIENDS
} from './actionTypes';

// action creators
export const showAddFriends = isShowing => {
  return {
    type: SHOW_ADD_FRIENDS,
    isShowing
  };
};

export const showSplitExpense = isShowing => {
  return {
    type: SHOW_SPLIT_EXPENSE,
    isShowing
  };
};

export const storeFriends = friends => {
  return {
    type: STORE_FRIENDS,
    friends
  };
};

// thunks
export const handleShowAddFriends = isShowing => dispatch => {
  dispatch(showAddFriends(!isShowing));
};

export const handleShowSplitExpense = isShowing => dispatch => {
  dispatch(showSplitExpense(!isShowing));
};

export const handleStoreFriends = friends => dispatch => {
  dispatch(storeFriends(friends));
};
