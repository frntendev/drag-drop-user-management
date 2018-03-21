import React, { Component } from "react";
import PropTypes from "prop-types";
import UserCard from "../components/UserCard";
import { connect } from "react-redux";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from "material-ui/Dialog";
import List from "material-ui/List";
import {
  removeUserFromGroup,
  updateActiveUser,
  removeUserFromActiveGroup
} from "../actions/groupActions";
import Button from "material-ui/Button";
import { css } from "react-emotion";
import { actions as notifActions } from "redux-notifications";
const { notifSend } = notifActions;

class GroupDetail extends Component {
  removeUserFromGroup(user) {
    this.props.removeUserFromGroup(user, this.props.group);
    this.props.removeUserFromActiveGroup(user);
    this.props.notifSend({
      message: "The user has been removed from the group",
      kind: "danger",
      dismissAfter: 2500
    });
  }

  showUserDetail(user) {
    this.props.updateActiveUser(user);
  }

  render() {
    if (!this.props.group) {
      return (
        <div
          className={css`
            display: none;
          `}
        >
          <span>No group selected</span>
        </div>
      );
    }

    const { name } = this.props.group;
    const { fullScreen } = this.props;
    return (
      <Dialog
        open={this.props.dialogOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={fullScreen}
      >
        <DialogTitle id="alert-dialog-title">{name}'s members</DialogTitle>
        <DialogContent>
          <List
            component="nav"
            className={css`
              min-height: 300px;
              max-height: 500px;
              overflow: auto;
            `}
          >
            {this.props.users.map(user => {
              return (
                <UserCard
                  key={user.id}
                  onRemoveClick={this.removeUserFromGroup.bind(this)}
                  onDetailClick={this.showUserDetail.bind(this)}
                  user={user}
                />
              );
            })}
          </List>
          <DialogContentText id="alert-dialog-description">
            Here you can see the group members and you can edit it. Use Close
            button to close the dialog.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.props.handleCloseDialog()}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
GroupDetail.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};
export default connect(null, {
  removeUserFromGroup,
  updateActiveUser,
  removeUserFromActiveGroup,
  notifSend
})(withMobileDialog()(GroupDetail));
