import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import App from '../ui/container/App';
import UsersListComponent from '../ui/container/FleshcardsPage';
import UserProfile from '../ui/container/UserProfile';
import LoginPage from '../ui/container/LoginPage';
import RegisterPage from '../ui/container/RegisterPage';
import privateRoute from './privateRoute';

export default (onLogout) => (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={UsersListComponent}/>
    <Route path="profile" component={privateRoute(UserProfile)}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="logout" onEnter={onLogout}/>
  </Route>
);
