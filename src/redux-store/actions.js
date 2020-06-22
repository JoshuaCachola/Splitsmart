import { SHOW_ADD_FRIENDS } from './actionTypes';

// action creators
export const showAddFriends = isShowing => {
  return {
    type: SHOW_ADD_FRIENDS,
    isShowing
  };
};

// thunks
export const handleShowAddFriends = isShowing => dispatch => {
  dispatch(showAddFriends(!isShowing));
};
