import * as actionTypes from '../actions';

const initialState = {
  registeringUser: false,
  loggingInUser: false,
  fetchingJokes: false,
  loggingOutUser: false,
  jokes: [],
  error: null
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTERING_USER:
      return {
        ...state,
        registeringUser: true
      };
    case actionTypes.REGISTERED_USER:
      return {
        ...state,
        registeringUser: false
      };
    case actionTypes.LOGGING_IN_USER:
      return {
        ...state,
        loggingInUser: true
      };
    case actionTypes.LOGGED_IN_USER:
      return {
        ...state,
        loggingInUser: false
      };
    case actionTypes.FETCHING_JOKES:
      return {
        ...state,
        fetchingJokes: true
      };
    case actionTypes.FETCHED_JOKES:
      return {
        ...state,
        fetchingJokes: false,
        jokes: action.payload
      };
    case actionTypes.LOGGING_OUT_USER:
      return {
        ...state,
        loggingOutUser: true
      };
    case actionTypes.LOGGED_OUT_USER:
      return {
        ...state,
        loggingOutUser: false,
        jokes: action.payload
      };
    case actionTypes.ERROR:
      return {
        ...state,
        registeringUser: false,
        loggingInUser: false,
        fetchingJokes: false,
        loggingOutUser: false,
        error: action.payload
      };
    default:
      return state;
  }
};
