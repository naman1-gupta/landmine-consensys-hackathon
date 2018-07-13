import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from '../reducers';

const preloadedState = window.__PRELOADED_STATE__;

const userToken = JSON.parse(localStorage.getItem('usertoken'));
const prefetchedState = {
  user: {
    data: userToken ? userToken.data : null,
    loggedInState: userToken ? userToken.loggedInState : false
  }
};

const store =
  module.hot && module.hot.data && module.hot.data.store ? module.hot.data.store : createStore(Reducer, { ...preloadedState, ...prefetchedState }, composeWithDevTools(applyMiddleware(Thunk)));

export default store;
