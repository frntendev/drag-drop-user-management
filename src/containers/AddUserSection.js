import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import { addUser } from "../actions/userActions";
import { connect } from "react-redux";
import Dialog, { withMobileDialog } from "material-ui/Dialog";
import DialogForm from "./DialogForm";
import UserForm from "../components/UserForm";
import { actions as notifActions } from "redux-notifications";
const { notifSend } = notifActions;
class AddUserSection extends React.Component {
  state = {
    open: false
  };
  onSubmit(data) {
    event.preventDefault();
    this.props.addUser(data);
    this.props.notifSend({
      message: "The user has been added successfully",
      kind: "success",
      dismissAfter: 2500
    });
    this.setState({
      open: false
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <div
          className={css`
            text-align: right;
          `}
        >
          <Button
            onClick={this.handleClickOpen.bind(this)}
            variant="fab"
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullScreen={fullScreen}
        >
          <DialogForm
            title={"Add User"}
            subtitle={
              "To Add a user to this website, please enter your name and allegiances here. We will send updates occationally."
            }
            component={<UserForm groups={this.props.groups} />}
            onSubmit={this.onSubmit.bind(this)}
            onCancel={this.handleClose.bind(this)}
          />
        </Dialog>
      </div>
    );
  }
}
AddUserSection.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default connect(null, { addUser, notifSend })(
  withMobileDialog()(AddUserSection)
);
