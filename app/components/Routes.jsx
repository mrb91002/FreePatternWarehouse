import {
  IndexRoute,
  Route,
  Router,
  browserHistory
} from 'react-router';
import AddPattern from 'components/AddPattern';
import App from 'components/App';
import HomePage from 'components/HomePage';
import LoginPage from 'components/LoginPage';
import PatternPage from 'components/PatternPage';
import ProfilePage from 'components/ProfilePage';
import React from 'react';

const Routes = React.createClass({

  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRoute component={HomePage} />

        <Route component={AddPattern} path="add-pattern" />
        <Route component={LoginPage} path="login" />
        <Route component={PatternPage} path="pattern/:id" />
        <Route component={ProfilePage} path="profile/:id" />

      </Route>
    </Router>;
  }
});

export default Routes;
