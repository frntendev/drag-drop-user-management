import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchUsers,
  addUser,
  searchUser,
  cancelUserSearch,
  getUserGroups
} from "../actions/userActions";
import UserList from "./UserList";
import UserDetail from "../components/UserDetail";
import SearchBar from "../components/SearchBar";
import ContentContainer from "../components/ContentContainer";
import Typography from "material-ui/Typography";
import AddUserSection from "../containers/AddUserSection";
import { CircularProgress } from "material-ui/Progress";
import { css } from "react-emotion";
class Users extends Component {
  state = {
    selectedUserGroups: [],
    open: false
  };
  componentWillMount() {
    this.props.fetchUsers();
  }
  handleOpenDialog = () => {
    this.setState({ open: true });
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  };
  searchUser(username) {
    this.props.searchUser(username);
  }

  resetUserSearch() {
    this.props.cancelUserSearch();
  }
  userGroups(user) {
    this.setState(
      {
        selectedUserGroups: this.props.getUserGroups(user)
      },
      () => {
        console.log(this.state.selectedUserGroups);
      }
    );
  }
  render() {
    if (this.props.users.isRequestingUsers) {
      return <CircularProgress />;
    }

    return (
      <ContentContainer
        gsize="700"
        customStyle={css`
          grid-area: user;
        `}
      >
        <Typography variant="display1" gutterBottom color="primary">
          User List
        </Typography>
        <Typography variant="subheading" gutterBottom>
          You can search, add and delete the users
        </Typography>
        <ContentContainer bcolor="#f5f5f5" shadow>
          <ContentContainer>
            <SearchBar
              label="User"
              onSearchSubmit={this.searchUser.bind(this)}
              onSearchReset={this.resetUserSearch.bind(this)}
            />
          </ContentContainer>
          <UserList
            getUserGroups={this.userGroups.bind(this)}
            users={this.props.users.visibleUsers}
            handleOpenDialog={this.handleOpenDialog.bind(this)}
          />
          <AddUserSection
            groups={this.props.groups}
            addUser={this.props.addUser}
          />
          <UserDetail
            user={this.props.users.activeUser}
            selectedUserGroups={this.state.selectedUserGroups}
            dialogOpen={this.state.open}
            handleCloseDialog={this.handleCloseDialog}
          />
        </ContentContainer>
      </ContentContainer>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users, groups: state.groups };
}

export default connect(mapStateToProps, {
  fetchUsers,
  addUser,
  searchUser,
  cancelUserSearch,
  getUserGroups
})(Users);
