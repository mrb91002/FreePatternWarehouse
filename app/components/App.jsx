import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import cookie from 'react-cookie';
import { withRouter } from 'react-router';

const App = React.createClass({
  getInitialState() {
    return {
      patterns: [],
      cookies: {}
    };
  },

  componentWillMount() {
    axios.get('/api/patterns2', { headers: { 'Content-Type': 'application/json',
      Accept: 'application/json' }})
      .then((patterns) => {
        this.setState({ patterns });
      })
      .catch(() => {
        // console.error(err.response || err);
      });

    const nextCookies = {
      loggedIn: cookie.load('loggedIn')
    };

    this.setState({ cookies: nextCookies });

    $(window).on('beforeunload', () => {
      $(window).scrollTop(0);
    });
  },

  handleTouchTapLogout() {
    axios.delete('/api/auth')
      .then(() => {
        this.updateCookies();
        this.props.router.push('/');
      })
      .catch();
  },

  handleTitleTouchTap() {
    this.props.router.push('/');
  },

  handleTouchTapRegister() {
    this.props.router.push('/register');
  },

  handleTouchTapLogin() {
    this.props.router.push('/login');
  },

  handleTouchTapUpload() {
    this.props.router.push('/add-pattern');
  },

  updateCookies() {
    const nextCookies = {
      loggedIn: cookie.load('loggedIn'),
      admin: cookie.load('admin')
    };

    this.setState({ cookies: nextCookies });
  },

  getChildrenProps() {
    const matchPath = this.props.routes.reduce((accum, route) => {
      // Sometimes route.path is undefined, so default to empty string
      return `${accum}${route.path || ''}`;
    }, '');

    const props = {
      '/': {
        patterns: this.state.patterns
      },
      '/login': {
        updateCookies: this.updateCookies
      },
      '/register': {
        updateCookies: this.updateCookies
      }
    };

    props['/pattern/:id'] = props['/'];
    props['/add-pattern'] = props['/'];
    props['/profile/:id'] = props['/'];

    return props[matchPath];
  },

  render() {
    const { pathname } = this.props.location;
    const { loggedIn } = this.state.cookies;

    const styleFlatButton = {
      height: '64px',
      lineHeight: '64px'
    };

    const showLogin = () => {
      if (!loggedIn) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const showRegister = () => {
      if (!loggedIn) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const showUpload = () => {
      if (!loggedIn && pathname !== '/add-pattern') {
        return { display: 'none' };
      }

      return { display: 'block' };
    };

    const showLogout = () => {
      if (loggedIn) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const styleAppBar = {
      backgroundColor: '#385D79',
      position: 'fixed'
    };

    const styleSearchButton = {
      backgroundColor: '#AD5057',
      height: '30px',
      lineHeight: '27px',
      border: 'none',
      borderRadius: '0 3px 3px 0',
      display: 'inline-block',
      marginTop: '18px'
    };

    const styleTextField = {
      backgroundColor: '#fff',
      borderRadius: '3px 0 0 3px',
      height: '10px',
      marginTop: '18px',
      border: 'none',
      padding: '10px',
      display: 'inline-block',
      boxShadow: '1px 1px 3px #c6cab9 inset'
    };

    const styleTitle = {
      cursor: 'pointer'
    };

    // console.log(this.state.patterns);
    return <div>
      <AppBar
        iconElementLeft={<IconButton />}
        onTitleTouchTap={this.handleTitleTouchTap}
        style={styleAppBar}
        title="Free Pattern Warehouse"
        titleStyle={styleTitle}
        zDepth={2}
      >

        <TextField
          id="topSearch"
          inputStyle={styleTextField}
          underlineShow={false}
        />
        <FlatButton
          label="Search"
          style={styleSearchButton}
        />
        {/* </div> */}

        <FlatButton
          label="Upload"
          onTouchTap={this.handleTouchTapUpload}
          style={Object.assign({}, styleFlatButton, showUpload())}
        />
        <FlatButton
          label="Login"
          onTouchTap={this.handleTouchTapLogin}
          style={Object.assign({}, styleFlatButton, showLogin())}
        />
        <FlatButton
          label="Register"
          onTouchTap={this.handleTouchTapRegister}
          style={Object.assign({}, styleFlatButton, showRegister())}
        />
        <FlatButton
          label="Logout"
          onTouchTap={this.handleTouchTapLogout}
          style={Object.assign({}, styleFlatButton, showLogout())}
        />
      </AppBar>

      {/* React.cloneElement is the glue that passes in props to children
          created with React Router. React router instantiates classes for
          us, and cloning the existing instance is the only way to set props.
      */}
      {React.cloneElement(this.props.children, this.getChildrenProps())}
    </div>;
  }
});

export default withRouter(App);
