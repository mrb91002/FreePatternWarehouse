import React from 'react';
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
            this.setState({ patterns, favorites, cookies: nextCookies });
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

  addFavorite(newFavorites) {
    console.log('newFavorites in app.jsx', newFavorites);
    const updatedFavorites = this.state.favorites.concat(newFavorites);
    console.log('old', this.state.favorites, 'new', updatedFavorites);
    this.setState({ favorites: updatedFavorites });
    console.log('newest', this.state.favorites);
  },

  removeFavorite(removedFavorite) {
    console.log('top', removedFavorite, this.state.favorites);
    const updatedFavorites = this.state.favorites.filter((favorite) => {
      // console.log('THIS IS THE FAVORITE THAT IS GETTING CHECKED', favorite);
      let check;

      // issue: two different objects objects coming in...
      if (favorite.patternId) {
        check = favorite.patternId;
      }
      else {
        check = favorite.id;
      }

      if (parseInt(removedFavorite) === parseInt(check)) {
        return false;
      }

      return true;
    })

    // console.log('updated Favorites ***:', updatedFavorites);
    this.setState({ favorites: updatedFavorites });
    // console.log('bottom', this.state.favorites);

  },

  handlePatternHover(updatedPatterns) {
    const newUpdatedPaterns = this.state.patterns
    newUpdatedPaterns.data.rows = updatedPatterns;

    this.setState({ patterns: newUpdatedPaterns});
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
        addFavorite: this.addFavorite,
        removeFavorite: this.removeFavorite,
        handlePatternHover: this.handlePatternHover
      },
      '/login': {
        updateCookies: this.updateCookies,
        addFavorite: this.addFavorite,
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
    if (Array.isArray(this.state.patterns)) {
      return <div />;
    }

    console.log('current Favorites', this.state.favorites);

    console.log('first!', this.state.patterns);
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

    return <div>
      <div className="nav">
        <h1 onTouchTap={this.handleTitleTouchTap}>Free Pattern Warehouse</h1>

        <div className="nav-right">
          <div className="search">
            <input type="text" />
            <button type="button">Search</button>
          </div>
          <button
            label="Upload"
            type="button"
            onTouchTap={this.handleTouchTapUpload}
            style={showUpload()}
          />
          <button
            label="Login"
            type="button"
            onTouchTap={this.handleTouchTapLogin}
            style={showLogin()}
          >Login</button>
          <button
            label="Register"
            type="button"
            onTouchTap={this.handleTouchTapRegister}
            style={showRegister()}
          >Register</button>
          <buton
            label="Profile"
            type="button"
            onTouchTap={this.handleTouchTapProfile}
            style={showLogout()}
          />
          <button
            label="Logout"
            type="button"
            onTouchTap={this.handleTouchTapLogout}
            style={showLogout()}
          />
        </div>
      </div>
      {/* <div
        className="appbar"
        onTitleTouchTap={this.handleTitleTouchTap}
        title="Free Pattern Warehouse"
        titleStyle={styleTitle}
        zDepth={2}
      >

        <input
          id="topSearch"
          inputStyle={styleTextField}
          underlineShow={false}
        />
        <button
          label="Search"
          style={styleSearchButton}
          type="button"
        >
          TEST
        </button>
        </div>

        <button
          label="Upload"
          onTouchTap={this.handleTouchTapUpload}
          style={Object.assign({}, styleFlatButton, showUpload())}
        />
        <button
          label="Login"
          onTouchTap={this.handleTouchTapLogin}
          style={Object.assign({}, styleFlatButton, showLogin())}
        />
        <button
          label="Register"
          onTouchTap={this.handleTouchTapRegister}
          style={Object.assign({}, styleFlatButton, showRegister())}
        />
        <buton
          label="Profile"
          onTouchTap={this.handleTouchTapProfile}
          style={Object.assign({}, styleFlatButton, showLogout())}
        />
        <button
          label="Logout"
          onTouchTap={this.handleTouchTapLogout}
          style={Object.assign({}, styleFlatButton, showLogout())}
        /> */}
        {/* React.cloneElement is the glue that passes in props to children
          created with React Router. React router instantiates classes for
          us, and cloning the existing instance is the only way to set props.
          */}
        {React.cloneElement(this.props.children, this.getChildrenProps())}
      </div>;

    // </div>;
  }
});

export default withRouter(App);
