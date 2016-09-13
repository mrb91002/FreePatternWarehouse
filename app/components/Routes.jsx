import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import App from 'components/App';
import HomePage from 'components/HomePage';
import React from 'react';
import LoginPage from 'components/LoginPage';
import PatternPage from 'components/PatternPage';
import ProfilePage from 'components/ProfilePage';
import AddPattern from 'components/AddPattern';

const Routes = React.createClass({

  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRoute component={HomePage} />

        <Route component={LoginPage} path="login" />
        <Route component={PatternPage} path="pattern/:id" />
        <Route component={ProfilePage} path="profile/:id" />
        <Route component={AddPattern} path="add-pattern"/>

      </Route>
    </Router>;
  }
});

export default Routes;
