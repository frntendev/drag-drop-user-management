import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from "material-ui/Dialog";
import List from "material-ui/List";
import Button from "material-ui/Button";
import { css } from "react-emotion";
import GroupCard from "./GroupCard";
class UserDetail extends Component {
  removeUserFromGroup(user) {
    this.props.removeUserFromGroup(user, this.props.group);
    this.props.removeUserFromActiveGroup(user);
  }

  showUserDetail(user) {
    this.props.updateActiveUser(user);
  }

  render() {
    if (!this.props.user) {
      return (
        <div
          className={css`
            display: none;
          `}
        >
          <span>No user selected</span>
        </div>
      );
    }

    const { fullScreen } = this.props;
    return (
      <Dialog
        open={this.props.dialogOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={fullScreen}
      >
        <DialogTitle id="alert-dialog-title">{`${
          this.props.user.firstname
        }'s groups`}</DialogTitle>
        <DialogContent>
          <List
            component="nav"
            className={css`
              min-height: 300px;
              max-height: 500px;
              overflow: auto;
            `}
          >
            {this.props.selectedUserGroups.map(group => {
              return <GroupCard key={group.id} group={group} hideActions />;
            })}
          </List>
          <DialogContentText id="alert-dialog-description">
            Here you can see the user groups. Use Close button to close the
            dialog.
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
UserDetail.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};
export default withMobileDialog()(UserDetail);
