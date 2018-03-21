import React from "react";
import styled from "react-emotion";
const ContentContainer = styled("div")`
  /* width: ${props => props.gsize && props.gsize + "px"}; */
  ${props => props.customStyle};
  border-radius:2px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 16px;
  background-color: ${props => props.bcolor};
  box-shadow: ${props =>
    props.shadow &&
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.09),0px 1px 18px 0px rgba(0, 0, 0, 0.06)"};
  @media (max-width: 800px) {
    padding: 0;
    width: 100%;
    margin-top: 5%;
  }
`;
export default props => {
  return <ContentContainer {...props} />;
};
