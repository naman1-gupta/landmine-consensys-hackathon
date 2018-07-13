import { USER_LOGGED_IN, USER_LOGGED_OUT, BEFORE_USER_LOGOUT } from '../actions/uport';

const initialState = {
  data: null,
  loggedInState: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BEFORE_USER_LOGOUT: {
      return {
        ...state,
        loggedInState: false
      };
    }
    case USER_LOGGED_IN: {
      localStorage.setItem('usertoken', JSON.stringify(action.payload));
      return {
        data: action.payload.data,
        loggedInState: action.payload.loggedInState
      };
    }
    case USER_LOGGED_OUT: {
      localStorage.removeItem('usertoken');
      return {
        data: null,
        loggedInState: false
      };
    }

    default:
      return state;
  }
};
