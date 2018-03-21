import _ from "lodash";
import uniqid from "uniqid";

import * as GroupActions from "../actions/groupActions";
const initialState = {
  activeGroup: null,
  activeGroupMembers: [],
  groups: [],
  visibleGroups: [],
  isRequestingGroups: true,
  errorLoadingGroups: null,
  loadingError: null
};

function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case GroupActions.GROUPS_REQUESTED:
      return Object.assign({}, state, {
        isRequestingGroups: true,
        errorLoadingGroups: null
      });

    case GroupActions.RECEIVE_GROUPS:
      return Object.assign({}, state, {
        groups: action.groups,
        visibleGroups: action.groups,
        isRequestingGroups: false,
        errorLoadingGroups: null
      });

    case GroupActions.RECEIVE_GROUPS_ERROR:
      return Object.assign({}, state, {
        isRequestingGroups: false,
        errorLoadingGroups: action.error
      });

    case GroupActions.ADD_GROUP:
      const group = action.group;
      group.id = uniqid();
      group.members = [];

      return Object.assign({}, state, {
        visibleGroups: [...state.groups, group],
        groups: [...state.groups, group]
      });

    case GroupActions.DELETE_GROUP:
      const groups = _.filter(state.groups, obj => {
        return obj.id !== action.group.id;
      });

      return Object.assign({}, state, {
        visibleGroups: groups,
        groups
      });

    case GroupActions.SEARCH_GROUP:
      const name = action.name.toLowerCase();

      return Object.assign({}, state, {
        visibleGroups: _.filter(state.groups, obj => {
          return obj.name.toLowerCase().search(name) > -1;
        })
      });

    case GroupActions.CANCEL_GROUP_SEARCH:
      return Object.assign({}, state, {
        visibleGroups: [...state.groups]
      });

    case GroupActions.ADD_USER_TO_GROUP:
      const targetGroup = _.find(state.groups, obj => {
        return obj.id === action.groupid;
      });

      if (targetGroup.members.indexOf(action.userid) < 0) {
        targetGroup.members.push(action.userid);
      }

      const allGroupsButTarget = _.filter(state.groups, obj => {
        return obj.id !== action.groupid;
      });

      let members = state.activeGroupMembers;
      if (
        state.activeGroup &&
        members &&
        state.activeGroup.id === action.groupid
      ) {
        if (members.indexOf(action.userid) < 0) {
          members.push(action.userid);
        }
      }

      return Object.assign({}, state, {
        groups: [...allGroupsButTarget, targetGroup],
        activeGroupMembers: [...members]
      });

    case GroupActions.REQUESTED_USERS_FOR_GROUP:
      return Object.assign({}, state, {
        activeGroup: action.group,
        activeGroupMembers: []
      });

    case GroupActions.RECEIVE_USERS_FOR_GROUP:
      return Object.assign({}, state, {
        activeGroupMembers: action.users
      });

    case GroupActions.UPDATE_ACTIVE_GROUP:
      return Object.assign({}, state, {
        activeGroup: action.group
      });

    case GroupActions.REMOVE_USER_FROM_ACTIVE_GROUP:
      return Object.assign({}, state, {
        activeGroupMembers: _.filter(state.activeGroupMembers, id => {
          return id !== action.user.id;
        })
      });

    case GroupActions.REMOVE_USER_FROM_GROUP:
      const targetGroup2 = _.find(state.groups, obj => {
        return obj.id === action.group.id;
      });

      const allGroupsButTarget2 = _.filter(state.groups, obj => {
        return obj.id !== action.group.id;
      });

      targetGroup2.members = _.filter(targetGroup2.members, id => {
        return id !== action.user.id;
      });

      const sortedGroups = _.sortBy(
        [targetGroup2, ...allGroupsButTarget2],
        o => o.id
      );

      return Object.assign({}, state, {
        groups: sortedGroups,
        visibleGroups: sortedGroups
      });

    case GroupActions.REMOVE_USER_FROM_ALL_GROUPS:
      const groupsMinusMember = state.groups.map(group => {
        group.members = _.filter(group.members, id => id !== action.user.id);
        return group;
      });

      return Object.assign({}, state, {
        groups: [...groupsMinusMember],
        visibleGroups: [...groupsMinusMember]
      });
    default:
      return state;
  }
}

export default groupsReducer;
