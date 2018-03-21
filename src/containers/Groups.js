import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchGroups,
  searchGroup,
  cancelGroupSearch
} from "../actions/groupActions";
import { CircularProgress } from "material-ui/Progress";
import SearchBar from "../components/SearchBar";
import GroupDetail from "./GroupDetail";
import GroupList from "./GroupList";
import { getUsersInGroup } from "../selectors/getUsersInGroup";
import ContentContainer from "../components/ContentContainer";
import Typography from "material-ui/Typography";
import AddGroupSection from "./AddGroupSection";
import { css } from "react-emotion";
class Groups extends Component {
  state = {
    open: false
  };
  componentWillMount() {
    this.props.fetchGroups();
  }

  searchGroup(name) {
    this.props.searchGroup(name);
  }

  resetGroupSearch() {
    this.props.cancelGroupSearch();
  }

  handleOpenDialog = () => {
    this.setState({ open: true });
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  };
  renderGroupRow(group) {
    return (
      <div key={group.id}>
        {group.name} ({group.members.length})
      </div>
    );
  }

  render() {
    if (this.props.isRequestingGroups) {
      return <CircularProgress />;
    }

    return (
      <ContentContainer
        gsize="700"
        customStyle={css`
          grid-area: group;
        `}
      >
        <Typography variant="display1" gutterBottom color="primary">
          Group List
        </Typography>
        <Typography variant="subheading" gutterBottom>
          You can search, add and delete the groups
        </Typography>
        <ContentContainer bcolor="#f5f5f5" shadow>
          <ContentContainer>
            <SearchBar
              label="Group"
              onSearchSubmit={this.searchGroup.bind(this)}
              onSearchReset={this.resetGroupSearch.bind(this)}
            />
          </ContentContainer>
          <GroupList
            groups={this.props.visibleGroups}
            handleOpenDialog={this.handleOpenDialog}
          />
          <AddGroupSection addUser={this.props.addUser} />
          <GroupDetail
            group={this.props.activeGroup}
            users={this.props.users}
            dialogOpen={this.state.open}
            handleCloseDialog={this.handleCloseDialog}
          />
        </ContentContainer>
      </ContentContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    visibleGroups: state.groups.visibleGroups,
    activeGroup: state.groups.activeGroup,
    users: getUsersInGroup(state),
    isRequestingGroups: state.groups.isRequestingGroups
  };
}

export default connect(mapStateToProps, {
  fetchGroups,
  searchGroup,
  cancelGroupSearch
})(Groups);
