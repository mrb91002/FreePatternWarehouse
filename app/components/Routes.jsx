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

const Routes = React.createClass({
  // handleChange(prevState, nextState, replace) {
    // console.log(prevState);
    // console.log(nextState);
    // console.log(replace);
  // },

  // handleEnter(event) {
    // console.log(event)
  // },

  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRoute component={HomePage} />



        <Route component={LoginPage} path="login" />
        <Route component={PatternPage} path="pattern/:id" />

      </Route>
    </Router>;
  }
});

export default Routes;
