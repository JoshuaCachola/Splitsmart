import { SHOW_ADD_FRIENDS } from './actionTypes';

export default function reducer(state = { showAddFriends: false }, action) {
  switch (action.type) {
    case SHOW_ADD_FRIENDS: {
      return {
        ...state,
        showAddFriends: action.isShowing
      }
    }
    default: return state
  }
};
