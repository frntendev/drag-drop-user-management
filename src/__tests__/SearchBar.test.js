import React from "react";
import { shallow, mount, configure } from "enzyme";
import { Field } from "redux-form";
import SearchBar from "../components/SearchBar";
import Adapter from "enzyme-adapter-react-15";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

describe("SearchBar Component", () => {
  const shallowComponent = shallow(<SearchBar />);
  const mountComponent = mount(<SearchBar />);
  it("should render without throwing an error", () => {
    expect(shallowComponent).toMatchSnapshot();
  });
  it("should find textfields in the component", () => {
    expect(mountComponent.find("#search-input").length).toEqual(4);
  });
  it("should respond to change event and change the state of the SearchBar Component", () => {
    const wrapper = shallow(
      <SearchBar onSearchSubmit={() => console.log("Yeap!")} />
    );
    wrapper
      .find("#search-input")
      .simulate("change", { target: { value: "sep" } });
    expect(wrapper.state("searchTerm")).toEqual("sep");
  });
});
