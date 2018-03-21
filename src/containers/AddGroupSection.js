import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import { addGroup } from "../actions/groupActions";
import { connect } from "react-redux";
import { actions as notifActions } from "redux-notifications";
const { notifSend } = notifActions;
import Dialog, { withMobileDialog } from "material-ui/Dialog";
import DialogForm from "./DialogForm";
import GroupForm from "../components/GroupForm";
class AddGroupSection extends React.Component {
  state = {
    open: false
  };

  onSubmit(data) {
    event.preventDefault();
    this.props.addGroup({
      ...data,
      members: []
    });
    this.props.notifSend({
      message: "The group has been added successfully",
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
            onClick={this.handleClickOpen}
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
            title={"Add Group"}
            subtitle={
              "To Add a group to this website, please enter name and location here. We will send updates occationally."
            }
            component={<GroupForm />}
            onSubmit={this.onSubmit.bind(this)}
            onCancel={this.handleClose.bind(this)}
          />
        </Dialog>
      </div>
    );
  }
}
AddGroupSection.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};
export default connect(null, { addGroup, notifSend })(
  withMobileDialog()(AddGroupSection)
);
