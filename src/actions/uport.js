export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const BEFORE_USER_LOGOUT = 'BEFORE_USER_LOGOUT';

export const loginUser = user => {
  return {
    type: USER_LOGGED_IN,
    payload: {
      data: user,
      loggedInState: true
    }
  };
};

export const userBeforeLoggedOut = () => async dispatch => {
  dispatch({
    type: BEFORE_USER_LOGOUT
  });
};

export const userLoggedOut = () => async dispatch => {
  dispatch({
    type: USER_LOGGED_OUT,
    payload: null
  });
};
