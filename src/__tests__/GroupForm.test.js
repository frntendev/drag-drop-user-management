import React from "react";
import { shallow, mount, configure } from "enzyme";
import { Field } from "redux-form";
import GroupForm from "../components/GroupForm";
import Adapter from "enzyme-adapter-react-15";
import TextField from "material-ui/TextField";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });
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
describe("GroupForm Component", () => {
  const shallowComponent = shallow(<GroupForm />);
  it("should render without throwing an error", () => {
    expect(shallowComponent).toMatchSnapshot();
  });
  it("should find textfields in the component", () => {
    expect(shallowComponent.find("#group-form").length).toEqual(1);
    expect(shallowComponent.find("[name='name']").length).toEqual(1);
    expect(shallowComponent.find("[name='location']").length).toEqual(1);
  });
});
