import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import cookie from 'react-cookie';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';

const App = React.createClass({
  getInitialState() {
    return {
      patterns: [],
    }
  },

  componentWillMount() {
    // Get the patterns from the API
    console.log('componentWillMount');
    axios.get('/api/patterns')
      .then((patterns) => {
        console.log(patterns);
        this.setState({ patterns: patterns });
      })
      .catch((err) => {
        console.error(err.response || err);
      });
  },

  getChildrenProps() {
    const matchPath = this.props.routes.reduce((accum, route) => {
      // Sometimes route.path is undefined, so default to empty string
      return `${accum}${route.path || ''}`;
    }, '');

    const props = {
      '/': {
        patterns: this.state.patterns
      }
    };

    return props[matchPath];
  },

  render() {
    console.log(this.state.patterns);
    return <div>
      <h1>Hello world</h1>

      {/* React.cloneElement is the glue that passes in props to children created with React Router. React router instantiates classes for us, and cloning the existing instance is the only way to set props.
      */}
      {React.cloneElement(this.props.children, this.getChildrenProps())}
    </div>
  }
});

export default withRouter(App);
