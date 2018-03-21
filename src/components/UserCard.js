import React, { Component, PropTypes } from "react";
import { DraggableTypes } from "../DraggableTypes";
import { DragSource } from "react-dnd";
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction
} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import ListItemText from "./ListItemText";
import DeleteIcon from "material-ui-icons/Delete";
import User from "material-ui-icons/Person";
import IconButton from "material-ui/IconButton";
import styled from "react-emotion";
const cardSource = {
  beginDrag(props) {
    return {
      id: props.user.id
    };
  }
};
const StyledListITem = styled(ListItem)`
  list-style: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
`;
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class UserCard extends Component {
  handleRemoveUser(user, event) {
    event.preventDefault();
    this.props.onRemoveClick(user);
  }

  handleDetailClick(user, event) {
    event.preventDefault();
    this.props.onDetailClick(user);
  }

  render() {
    const { user, connectDragSource } = this.props;
    return connectDragSource(
      <div>
        <StyledListITem onClick={this.handleDetailClick.bind(this, user)}>
          <ListItemAvatar>
            <Avatar>
              <User />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${user.firstname} ${user.lastname}`}
            secondary={user.allegiances}
          />
          <ListItemSecondaryAction>
            <IconButton
              color="secondary"
              aria-label="Delete"
              onClick={this.handleRemoveUser.bind(this, user)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </StyledListITem>
      </div>,
      { dropEffect: "copy" }
    );
  }
}

UserCard.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(DraggableTypes.USER, cardSource, collect)(UserCard);
