import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class MyAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: undefined,
    }
  }

  handleClick = (evt) => {
    const currentTarget = evt.currentTarget;
    this.setState({
      open: true,
      anchorEl: currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
      <AppBar
        onLeftIconButtonClick={this.handleClick}
        title="Title"
      />
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        onRequestClose={this.handleRequestClose}
      >
      <Menu>
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help &amp; feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Sign out" />
      </Menu>
    </Popover>
    </div>
    );
  }
}

export default MyAppBar;