import React from "react";
import { Field } from "redux-form";
import { css } from "react-emotion";
import TextField from "material-ui/TextField";
const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error ? true : false}
    {...input}
    {...custom}
  />
);
const required = value => (value ? undefined : "Required");
const UserForm = props => {
  return (
    <div
    id="user-form"
      className={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      <Field
        name="firstname"
        component={renderTextField}
        label="First Name"
        validate={[required]}
        className={css`
          flex: 1;
          margin-right: 5%;
        `}
      />
      <Field
        name="lastname"
        component={renderTextField}
        label="Last Name"
        validate={[required]}
        className={css`
          flex: 1;
        `}
      />
      <Field
        name="allegiances"
        component={renderTextField}
        label="Allegiances"
        validate={[required]}
        fullWidth
        className={css`
          margin-top: 2%;
        `}
      />
    </div>
  );
};

export default UserForm;
