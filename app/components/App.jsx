import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';

const App = React.createClass({
  getInitialState() {
    return {
      patterns: [],
      cookies: {}
    };
  },

  componentWillMount() {
    axios.get('/api/patterns2', { headers: { 'Content-Type': 'application/json',
      'Accept': 'application/json' }})
      .then((patterns) => {
        this.setState({ patterns });
        this.forceUpdate();
      })
      .catch(() => {
        // console.error(err.response || err);
      });

      const nextCookies = {
        loggedIn: cookie.load('loggedIn')
        // admin: cookie.load('admin')
      };

      this.setState({ cookies: nextCookies });

    // axios.post('/api/auth', {userName: 'Ohsewmuch', password: 'Ohsewmuchadmin1!'}, {headers: {'Content-Type': 'application/json',
    //   'Accept': 'application/json'}})
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.error(err.response || err);
    //   });

    $(window).on('beforeunload', () => {
      $(window).scrollTop(0);
    });
  },

  handleTitleTouchTap() {
    this.props.router.push('/');
  },

  handleTouchTapLogin() {
    this.props.router.push('/login');
  },

  handleTouchTapUpload() {
    this.props.router.push('/add-pattern');
  },

  updateCookies() {
    const nextCookies = {
      loggedIn: cookie.load('loggedIn')
      // admin: cookie.load('admin')
    };

    this.setState({ cookies: nextCookies })
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

    props['/pattern/:id'] = props['/'];
    props['/add-pattern'] = props['/'];

    return props[matchPath];
  },

  render() {
    // const { pathname } = this.props.location;

    const styleFlatButton = {
      height: '64px',
      lineHeight: '64px'
    };

    // const styleNavInput = {
    //   borderRadius: '3px 0 0 3px',
    //   height: '29px',
    //   marginTop: '20px',
    //   border: 'none',
    //   padding: '9px',
    //   width: '50%'
    // };

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

    // const styleFooter = () => {
    //   if (pathname === '/add-pattern') {
    //     return {
    //       position: 'fixed',
    //       backgroundColor: 'blue',
    //       bottom: '0',
    //       display: 'block',
    //       width: '100%',
    //       zIndex: '10000'
    //     }
    //   }
    //
    //   return {
    //     display: 'none'
    //   }
    // }

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
      {/* <div style={styleInputContainer}> */}
        {/* <input style={styleNavInput} /> */}

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
          style={styleFlatButton}
        />
        <FlatButton
          label="Login"
          onTouchTap={this.handleTouchTapLogin}
          style={styleFlatButton}
        />
        <FlatButton
          label="Register"
          style={styleFlatButton}
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
