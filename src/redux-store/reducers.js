import {
  SHOW_ADD_FRIENDS,
  SHOW_SPLIT_EXPENSE,
  STORE_FRIENDS
} from './actionTypes';

export default function reducer(state = {
  showAddFriends: false,
  showSplitExpense: false
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
    default: return state
  }
};
