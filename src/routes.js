import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';

import { PrivateRoute, PublicRoute } from './hoc/router';

const NoMatch = () => (
  <div>
    <h3>No match for</h3>
  </div>
);

const routes = () => (
  <Switch>
    <PrivateRoute path="/home" component={Home} />
    <PublicRoute exact path="/" component={props => Login({ ...props })} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default routes;
