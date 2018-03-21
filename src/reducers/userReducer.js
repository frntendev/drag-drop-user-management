import _ from "lodash";
import uniqid from "uniqid";

import * as UserActions from "../actions/userActions";

const initialState = {
  activeUser: null,
  users: [],
  visibleUsers: [],
  isRequestingUsers: true,
  errorLoadingUsers: null,
  loadingError: null
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case UserActions.USERS_REQUESTED:
      return Object.assign({}, state, {
        isRequestingUsers: true,
        errorLoadingUsers: null
      });

    case UserActions.RECEIVE_USERS:
      return Object.assign({}, state, {
        users: action.users,
        visibleUsers: action.users,
        isRequestingUsers: false,
        errorLoadingUsers: null
      });

    case UserActions.RECEIVE_USERS_ERROR:
      return Object.assign({}, state, {
        isRequestingUsers: false,
        errorLoadingUsers: action.error
      });

    case UserActions.ADD_USER:
      const user = action.user;
      if (!action.user.id) user.id = uniqid();

      return Object.assign({}, state, {
        visibleUsers: [...state.users, user],
        users: [...state.users, user]
      });

    case UserActions.SEARCH_USER:
      const name = action.username.toLowerCase();

      return Object.assign({}, state, {
        visibleUsers: _.filter(state.users, obj => {
          return (
            obj.firstname.toLowerCase().search(name) > -1 ||
            obj.lastname.toLowerCase().search(name) > -1
          );
        })
      });

    case UserActions.CANCEL_USER_SEARCH:
      return Object.assign({}, state, {
        visibleUsers: [...state.users]
      });

    case UserActions.DELETE_USER:
      const users = _.filter(state.users, obj => {
        return obj.id !== action.user.id;
      });

      let activeUser = state.activeUser;
      if (activeUser && activeUser.id === action.user.id) {
        activeUser = null;
      }

      return Object.assign({}, state, {
        visibleUsers: users,
        users,
        activeUser
      });

    case UserActions.UPDATE_ACTIVE_USER:
      return Object.assign({}, state, {
        activeUser: action.user
      });
    default:
      return state;
  }
}

export default usersReducer;
