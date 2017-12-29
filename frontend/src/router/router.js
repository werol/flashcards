import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import App from '../ui/container/App';
import HomePage from '../ui/container/HomePage';
import UserProfile from '../ui/container/UserProfile';
import LoginPage from '../ui/container/LoginPage';
import RegisterPage from '../ui/container/RegisterPage';
import FlashcardsFormPage from '../ui/container/FlashcardsFormPage';
import ShowFlashcardSetPage from '../ui/container/ShowFlashcardSetPage';
import privateRoute from './privateRoute';

export default (onLogout) => (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={privateRoute(HomePage)}/>
    <Route path="profile" component={privateRoute(UserProfile)}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="logout" onEnter={onLogout}/>
    <Route path="flashcards-form" component={privateRoute(FlashcardsFormPage)}/>
    <Route path="show-set/:setId" component={privateRoute(ShowFlashcardSetPage)}/>
  </Route>
);
