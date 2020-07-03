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

export default function reducer(state = {
  showAddFriends: false,
  showSplitExpense: false,
  yourFriends: [],
  friendsSplitExpense: [],
  showSettleUp: false,
  showDashboard: true,
  showRecentActivity: false,
  showAllExpenses: false,
  showSettleTransaction: false,
  displayUser: {}
}, action) {
  switch (action.type) {
    case SHOW_ADD_FRIENDS: {
      return {
        ...state,
        showAddFriends: action.isShowing
      }
    }
    case SHOW_SPLIT_EXPENSE: {
      return {
        ...state,
        showSplitExpense: action.isShowing
      }
    }
    case STORE_FRIENDS: {
      return {
        ...state,
        yourFriends: action.friends
      }
    }
    case FRIENDS_SPLIT_EXPENSE: {
      return {
        ...state,
        friendsSplitExpense: action.friends
      }
    }
    case SHOW_SETTLE_UP: {
      return {
        ...state,
        showSettleUp: action.isShowing
      }
    }
    case SHOW_DASHBOARD: {
      return {
        ...state,
        showDashboard: action.isShowing
      }
    }
    case SHOW_RECENT_ACTIVITY: {
      return {
        ...state,
        showRecentActivity: action.isShowing
      }
    }
    case SHOW_ALL_EXPENSES: {
      return {
        ...state,
        showAllExpenses: action.isShowing
      }
    }
    case SHOW_SETTLE_TRANSACTION: {
      return {
        ...state,
        showSettleTransaction: action.isShowing
      }
    }
    case DISPLAY_USER: {
      return {
        ...state,
        displayUser: action.user
      }
    }
    case CURRENT_USER_ID: {
      return {
        ...state,
        currentUserId: action.id
      }
    }
    default: return state
  }
};
