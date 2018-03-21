import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteGroup,
  addUserToGroup,
  updateActiveGroup,
  fetchUsersInGroup
} from "../actions/groupActions";
import { actions as notifActions } from "redux-notifications";
const { notifSend } = notifActions;
import GroupCard from "../components/GroupCard";
import List from "material-ui/List";
import styled from "react-emotion";
const StyledList = styled(List)`
  height: 300px;
  overflow: auto;
  @media (max-width: 800px) {
    height: 250px;
  }
`;
class GroupList extends Component {
  handleRemoveGroup(group) {
    const memberNo = group.members.length;
    if (memberNo > 0) {
      this.props.notifSend({
        message: `The group has ${memberNo} member${
          memberNo > 1 ? "s" : ""
        } right now`,
        kind: "warning",
        dismissAfter: 2500
      });
    } else {
      this.props.deleteGroup(group);
      this.props.notifSend({
        message: "The group has been removed",
        kind: "danger",
        dismissAfter: 2500
      });
    }
  }

  onDropUser(userid, groupid) {
    this.props.addUserToGroup(userid, groupid);
  }

  showGroupDetail(group) {
    this.props.updateActiveGroup(group);
    this.props.fetchUsersInGroup(group);
    this.props.handleOpenDialog();
  }

  render() {
    return (
      <StyledList component="nav">
        {this.props.groups.map(group => {
          return (
            <GroupCard
              key={group.id}
              onDrop={this.onDropUser.bind(this)}
              removeButtonClick={this.handleRemoveGroup.bind(this)}
              onDetailClick={this.showGroupDetail.bind(this, group)}
              group={group}
              showActions
            />
          );
        })}
      </StyledList>
    );
  }
}

export default connect(null, {
  deleteGroup,
  addUserToGroup,
  updateActiveGroup,
  fetchUsersInGroup,
  notifSend
})(GroupList);
