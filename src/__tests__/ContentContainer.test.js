import React from "react";
import { shallow, mount, configure } from "enzyme";
import ContentContainer from "../components/ContentContainer";
import Adapter from "enzyme-adapter-react-15";
configure({ adapter: new Adapter() });
describe("ExampleComponent", () => {
  test("renders component itself correctly", () => {
    const renderedComponent = shallow(<ContentContainer></ContentContainer>);
    expect(renderedComponent).toMatchSnapshot();
  });
  test("renders compoenent and children correctly",()=>{
      const renderedComponent = shallow(<ContentContainer><div className="test-classname">Test</div></ContentContainer>)
      expect(renderedComponent).toMatchSnapshot();
  })
});
