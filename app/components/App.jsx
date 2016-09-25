import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import cookie from 'react-cookie';
import { withRouter } from 'react-router';

const headers = { headers:
  { 'Content-Type': 'application/json', Accept: 'application/json' }
};

const App = React.createClass({
  getInitialState() {
    return {
      patterns: [],
      cookies: {},
      favorites: []
    };
  },

  componentWillMount() {
    axios.get('/api/patterns2', headers)
      .then((patterns) => {
        let loggedIn = cookie.load('loggedIn');
        let loggedInTest = cookie.load('loggedIn');
        let favorites;

        if (loggedIn) {
          loggedIn = JSON.parse(loggedIn.substring(2));
          console.log('LOGGED IN',loggedIn);
        }
        else {
          loggedIn = '';
        }
        const nextCookies = {
          loggedIn
        };

        if (loggedInTest) {
          axios.get(`/api/favorites/${loggedIn.userId}`, headers)
          .then((userFavorites) => {
            favorites = userFavorites.data;
            console.log('axios Favorites', favorites);
            this.setState({ patterns, favorites, cookies: nextCookies });
            console.log('state', this.state);
          })
          .catch((err) => {
            console.log(err);
          });
        }
        else {
          this.setState({ patterns, cookies: nextCookies });
        }
      })
      .catch(() => {
        // console.error(err.response || err);
      });

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

  handleAddPattern(pattern) {
    const nextPatterns = this.state.patterns;

    pattern.data.images = pattern.data.images.map((image) => {
      return [image.image_url, image.alt_text];
    });

    pattern.data.steps = pattern.data.steps.map((step) => {
      return [step.detail];
    });

    pattern.data.materials = pattern.data.materials.map((material) => {
      return [material.material];
    });

    pattern.data.userImageUrl = this.state.cookies.loggedIn.userImageUrl;
    pattern.data.userName = this.state.cookies.loggedIn.userName;

    nextPatterns.data.rows = this.state.patterns.data.rows.concat(pattern.data);
    this.setState({ patterns: nextPatterns });
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

  handleTouchTapProfile() {
    this.props.router.push(`/profile/${this.state.cookies.loggedIn.userName}`);
  },

  updateCookies() {
    let loggedIn = cookie.load('loggedIn');

    if (loggedIn) {
      loggedIn = JSON.parse(loggedIn.substring(2));
    }

    const nextCookies = {
      loggedIn
    };

    this.setState({ cookies: nextCookies });
  },

  updateFavorites(newfavorites) { // not working
    const favorites = newfavorites.data;

    this.setState({ favorites })
  },

  getChildrenProps() {
    const matchPath = this.props.routes.reduce((accum, route) => {
      // Sometimes route.path is undefined, so default to empty string
      return `${accum}${route.path || ''}`;
    }, '');

    const props = {
      '/': {
        patterns: this.state.patterns,
        cookies: this.state.cookies, // doesn't actually need to be passed
        favorites: this.state.favorites,
        updateFavorites: this.updateFavorites
      },
      '/login': {
        updateCookies: this.updateCookies,
        updateFavorites: this.updateFavorites,
        cookies: this.state.cookies
      },
      '/register': {
        updateCookies: this.updateCookies
      },
      '/add-pattern': {
        patterns: this.state.patterns,
        addPattern: this.handleAddPattern
      }
    };

    props['/pattern/:id'] = props['/'];
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
          icon={<FontIcon className="material-icons">account_circle</FontIcon>}
          label="Profile"
          onTouchTap={this.handleTouchTapProfile}
          style={Object.assign({}, styleFlatButton, showLogout())}
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
