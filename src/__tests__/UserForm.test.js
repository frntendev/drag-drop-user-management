import React from "react";
import { shallow, mount, configure } from "enzyme";
import { Field } from "redux-form";
import UserForm from "../components/UserForm";
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
describe("UserForm Component", () => {
  const shallowComponent = shallow(<UserForm />);
  // const mountComponent = mount(<GroupForm />);
  it("should render without throwing an error", () => {
    expect(shallowComponent).toMatchSnapshot();
  });
  it("should find textfields in the component", () => {
    expect(shallowComponent.find("#user-form").length).toEqual(1);
    expect(shallowComponent.find("[name='firstname']").length).toEqual(1);
    expect(shallowComponent.find("[name='lastname']").length).toEqual(1);
    expect(shallowComponent.find("[name='allegiances']").length).toEqual(1);
  });
});
