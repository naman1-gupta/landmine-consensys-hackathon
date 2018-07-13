import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, style, ...rest }) => (
  <Route {...rest} render={props => (localStorage.getItem('usertoken') !== null ? <Component {...props} styles={style} /> : <Redirect to="/" />)} />
);

export const PublicRoute = ({ component: Component, style, ...rest }) => (
  <Route {...rest} render={props => (localStorage.getItem('usertoken') === null ? <Component {...props} styles={style} /> : <Redirect to="/home" />)} />
);
