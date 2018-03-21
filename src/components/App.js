import React from "react";
import Users from "../containers/Users";
import Groups from "../containers/Groups";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import styled from "react-emotion";
const ContentContainer = styled("div")`
  display: grid;
  grid-template-areas: ". user . group .";
  grid-template-columns: 2% 45% 6% 45% 2%;
  padding-top: 20px;
  margin: 20px;
  @media (max-width: 800px) {
    grid-template-areas:
      "user"
      "group";
      grid-template-columns: 100%;
  }
`;
const App = () => {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Drag Drop User Management
          </Typography>
        </Toolbar>
      </AppBar>
      <ContentContainer>
        <Users />
        <Groups />
      </ContentContainer>
    </div>
  );
};

export default DragDropContext(HTML5Backend)(App);
