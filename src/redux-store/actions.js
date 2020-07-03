import {
  SHOW_ADD_FRIENDS,
  SHOW_SPLIT_EXPENSE,
  STORE_FRIENDS,
  FRIENDS_SPLIT_EXPENSE,
  SHOW_SETTLE_UP,
  SHOW_DASHBOARD,
  SHOW_RECENT_ACTIVITY,
  SHOW_ALL_EXPENSES,
  SHOW_SETTLE_TRANSACTION,
  DISPLAY_USER,
  CURRENT_USER_ID
} from './actionTypes';

import { FIRST_NAME, LAST_NAME } from '../utils/constants';
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

export const friendsSplitExpense = friends => {
  return {
    type: FRIENDS_SPLIT_EXPENSE,
    friends
  }
};

export const showSettleUp = isShowing => {
  return {
    type: SHOW_SETTLE_UP,
    isShowing
  }
};

export const showDashboard = isShowing => {
  return {
    type: SHOW_DASHBOARD,
    isShowing
  };
};

export const showRecentActivity = isShowing => {
  return {
    type: SHOW_RECENT_ACTIVITY,
    isShowing
  };
};

export const showAllExpenses = isShowing => {
  return {
    type: SHOW_ALL_EXPENSES,
    isShowing
  };
};

export const showSettleTransaction = isShowing => {
  return {
    type: SHOW_SETTLE_TRANSACTION,
    isShowing
  };
};

export const displayUser = user => {
  return {
    type: DISPLAY_USER,
    user
  };
};

export const currentUserId = id => {
  return {
    type: CURRENT_USER_ID,
    id
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

export const handleFriendsSplitExpense = friends => dispatch => {
  dispatch(friendsSplitExpense(friends));
};

export const handleShowSettleUp = isShowing => dispatch => {
  dispatch(showSettleUp(!isShowing));
};

export const handleShowDashboard = isShowing => dispatch => {
  dispatch(showDashboard(isShowing));
};

export const handleShowRecentActivity = isShowing => dispatch => {
  dispatch(showRecentActivity(isShowing));
};

export const handleShowAllExpenses = isShowing => dispatch => {
  dispatch(showAllExpenses(isShowing));
};

export const handleShowSettleTransaction = isShowing => dispatch => {
  dispatch(showSettleTransaction(!isShowing));
}

export const handleDisplayUser = user => dispatch => {
  localStorage.setItem(FIRST_NAME, user.firstName);
  localStorage.setItem(LAST_NAME, user.lastName);
  dispatch(displayUser(user));
};

export const handleCurrentUserId = id => dispatch => {
  dispatch(currentUserId(id));
};
