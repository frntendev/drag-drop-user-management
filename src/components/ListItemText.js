import React from "react";
import styled from "react-emotion";
import { ListItemText } from "material-ui/List";
const StyledListItemText = styled(ListItemText)`
  @media (max-width: 800px) {
    h3 {
      font-size: 10px;
      font-weight: bold;
    }
    p {
      font-size: 10px;
    }
  }
`;
export default props => {
  return <StyledListItemText {...props} />;
};
