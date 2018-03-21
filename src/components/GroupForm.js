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
    id={label}
    label={label}
    error={touched && error ? true : false}
    {...input}
    {...custom}
  />
);
const required = value => (value ? undefined : "Required");

const GroupForm = props => {
  return (
    <div
      id="group-form"
      className={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      <Field
        name="name"
        component={renderTextField}
        label="Name"
        validate={[required]}
        className={css`
          flex: 1;
          margin-right: 5%;
        `}
      />
      <Field
        name="location"
        component={renderTextField}
        label="Location"
        validate={[required]}
        className={css`
          flex: 1;
        `}
      />
    </div>
  );
};

export default GroupForm;
