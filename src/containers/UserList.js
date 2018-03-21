import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser, updateActiveUser } from "../actions/userActions";
import { removeUserFromAllGroups } from "../actions/groupActions";
import { actions as notifActions } from "redux-notifications";
const { notifSend } = notifActions;
import UserCard from "../components/UserCard";
import List from "material-ui/List";
import styled from "react-emotion";
const StyledList = styled(List)`
  height: 300px;
  overflow: auto;
  @media (max-width: 800px) {
    height: 250px;
  }
`;
class UserList extends Component {
  handleRemoveUser(user) {
    this.props.deleteUser(user);
    this.props.removeUserFromAllGroups(user);
    this.props.notifSend({
      message: "The user has been removed",
      kind: "danger", 
      dismissAfter: 2500
    });
  }

  onDetailClick(user) {
    this.props.updateActiveUser(user);
    this.props.getUserGroups(user);
    this.props.handleOpenDialog();
  }

  render() {
    return (
      <StyledList component="nav">
        {this.props.users.map(user => {
          return (
            <UserCard
              key={user.id}
              onRemoveClick={this.handleRemoveUser.bind(this)}
              onDetailClick={this.onDetailClick.bind(this)}
              getUserGroups={this.props.getUserGroups}
              user={user}
            />
          );
        })}
      </StyledList>
    );
  }
}

export default connect(null, {
  deleteUser,
  updateActiveUser,
  removeUserFromAllGroups,
  notifSend
})(UserList);
