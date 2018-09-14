import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import * as actions from './actions';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Jokes from './components/Jokes';
import Nav from './components/Nav';

class App extends Component {
  state = {
    open: false
  };
  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({ open: true });
    }
  }

  onLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <div className="App">
        <Nav onLogout={this.onLogout} />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          style={{ width: '40%', marginLeft: 'auto', marginRight: 'auto' }}
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={3000}
        >
          <SnackbarContent
            style={{ backgroundColor: '#D32F2F' }}
            aria-describedby="message-id"
            message={<span id="message-id">{this.props.error}</span>}
          />
        </Snackbar>

        <Route
          path="/login"
          render={props => (
            <Login {...props} loginUser={this.props.loginUser} />
          )}
        />
        <Route
          path="/register"
          render={props => (
            <Register {...props} registerUser={this.props.registerUser} />
          )}
        />
        <Route
          path="/jokes"
          render={props => (
            <Jokes
              {...props}
              fetchJokes={this.props.fetchJokes}
              jokes={this.props.jokes}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registeringUser: state.registeringUser,
    loggingInUser: state.loggingInUser,
    fetchingJokes: state.fetchingJokes,
    loggingOutUser: state.loggingOutUser,
    jokes: state.jokes,
    error: state.error
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(App)
);
