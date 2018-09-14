import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Jokes from './components/Jokes';
import Nav from './components/Nav';

class App extends Component {
  onLogout = () => {
    this.props.logoutUser(this.props.history);
  };
  render() {
    return (
      <div className="App">
        <Nav onLogout={this.onLogout} />
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
