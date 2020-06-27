import {
  SHOW_ADD_FRIENDS,
  SHOW_SPLIT_EXPENSE,
  STORE_FRIENDS,
  FRIENDS_SPLIT_EXPENSE,
  SHOW_SETTLE_UP
} from './actionTypes';

export default function reducer(state = {
  showAddFriends: false,
  showSplitExpense: false,
  yourFriends: [],
  friendsSplitExpense: [],
  showSettleUp: false
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
    default: return state
  }
};
