import React, { Component, PropTypes } from "react";
import { DropTarget } from "react-dnd";
import { DraggableTypes } from "../DraggableTypes";
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction
} from "material-ui/List";
import ListItemText from "./ListItemText";
import Avatar from "material-ui/Avatar";
import DeleteIcon from "material-ui-icons/Delete";
import User from "material-ui-icons/People";
import IconButton from "material-ui/IconButton";
import Chip from "material-ui/Chip";
import { css } from "react-emotion";
const userTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem().id, props.group.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class GroupCard extends Component {
  handleRemoveGroup(group, event) {
    event.preventDefault();
    this.props.removeButtonClick(group);
  }

  handleDetailClick(group, event) {
    event.preventDefault();
    this.props.onDetailClick(group);
  }

  render() {
    const { connectDropTarget, isOver, group } = this.props;
    const members = group.members.length;
    const s = members > 1 ? "s" : "";
    return connectDropTarget(
      <div>
        <ListItem
          button
          className={css`
            background-color: ${isOver && "rgba(27, 177, 60, 0.15)"};
          `}
          onClick={this.handleDetailClick.bind(this, group)}
        >
          <ListItemAvatar>
            <Avatar>
              <User />
            </Avatar>
          </ListItemAvatar>

          <ListItemText primary={group.name} secondary={group.location} />
          <Chip
            className={css`
              margin-right: 10px;
              width: 90px;
            `}
            label={`${members} member${s}`}
          />
          {this.props.showActions && (
            <ListItemSecondaryAction>
              <IconButton
                color="secondary"
                aria-label="Delete"
                onClick={this.handleRemoveGroup.bind(this, group)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </div>
    );
  }
}

GroupCard.propTypes = {
  group: PropTypes.object.isRequired,
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(DraggableTypes.USER, userTarget, collect)(GroupCard);
