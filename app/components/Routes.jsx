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
import RegisterPage from 'components/RegisterPage';

const Routes = React.createClass({

  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRoute component={HomePage} />

        <Route component={AddPattern} path="add-pattern" />
        <Route component={LoginPage} path="login" />
        <Route component={PatternPage} path="pattern/:id" />

        <Route component={ProfilePage} path="profile/:id" >
          {/* <IndexRoute component={favorites} /> */}

          {/* <Route component={} path="/mypatterns" /> */}

        </Route>

        <Route component={RegisterPage} path="register" />

      </Route>
    </Router>;
  }
});

export default Routes;
