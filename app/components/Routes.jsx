import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import App from 'components/App';
import HomePage from 'components/HomePage';
import React from 'react';

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

      </Route>
    </Router>;
  }
});

export default Routes;
