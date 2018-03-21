import fetch from "../api/fetch";
import _ from "lodash";
export const FETCH_USERS = "FETCH_USERS";
export const USERS_REQUESTED = "USERS_REQUESTED";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USERS_ERROR = "RECEIVE_USERS_ERROR";
export const ADD_USER = "ADD_USER";
export const SEARCH_USER = "SEARCH_USER";
export const CANCEL_USER_SEARCH = "CANCEL_USER_SEARCH";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_ACTIVE_USER = "UPDATE_ACTIVE_USER";

export function usersRequested() {
  return {
    type: USERS_REQUESTED
  };
}

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function receiveUsersError(error) {
  return {
    type: RECEIVE_USERS_ERROR,
    error
  };
}

export function fetchUsers() {
  return dispatch => {
    dispatch(usersRequested());

    return fetch.users().then(users => {
      dispatch(receiveUsers(users));
    });
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}

export function searchUser(username) {
  return {
    type: SEARCH_USER,
    username
  };
}
export function getUserGroups(user) {
  return (dispatch, getState) => {
    const userGroups = [];
    getState().groups.groups.map(group => {
      const existUser = _.filter(group.members, id => id === user.id);
      if (existUser.length !== 0) userGroups.push(group);
      return true;
    });
    return userGroups;
  };
}

export function cancelUserSearch() {
  return {
    type: CANCEL_USER_SEARCH
  };
}

export function deleteUser(user) {
  return {
    type: DELETE_USER,
    user
  };
}

export function updateActiveUser(user) {
  return {
    type: UPDATE_ACTIVE_USER,
    user
  };
}
