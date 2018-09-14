import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class Nav extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            {localStorage.getItem('token') ? (
              <React.Fragment>
                <Button component={Link} to="/jokes" color="inherit">
                  View Jokes
                </Button>
                <Button onClick={this.props.onLogout} color="inherit">
                  Sign Out
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Nav;
