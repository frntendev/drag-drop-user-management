import React, { Component } from "react";
import { FormControl, FormGroup } from "material-ui/Form";
import TextField from "material-ui/TextField";
import { css } from "react-emotion";
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
  }

  onInputChange(event) {
    this.setState({ searchTerm: event.target.value }, () => {
      this.props.onSearchSubmit(this.state.searchTerm);
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.onSearchSubmit(this.state.searchTerm);
  }

  onFormReset() {
    this.props.onSearchReset();
    this.setState({ searchTerm: "" });
  }

  render() {
    return (
      <FormControl
        id="search-form"
        component="form"
        onSubmit={this.onFormSubmit.bind(this)}
        onReset={this.onFormReset.bind(this)}
        className={css`
          width: 100%;
          @media (max-width: 800px) {
            padding-left: 24px;
            padding-right: 24px;
            box-sizing: border-box;
          }
        `}
      >
        <FormGroup>
          <TextField
            id="search-input"
            label="Search"
            value={this.state.searchTerm}
            margin="normal"
            onChange={this.onInputChange.bind(this)}
            fullWidth
          />
        </FormGroup>
      </FormControl>
    );
  }
}

export default SearchBar;
