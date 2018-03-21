import React from "react";
import { reduxForm } from "redux-form";
import Button from "material-ui/Button";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

const DialogForm = props => {
  const { handleSubmit } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.subtitle}</DialogContentText>
          {props.component}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button color="primary" variant="raised" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default reduxForm({ 
  form: "UserForm" // a unique identifier for this form
})(DialogForm);
