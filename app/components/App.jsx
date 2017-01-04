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
        console.error(err.response || err);
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

  handleTouchTapMenu() {
      var sideNav = document.getElementById('side-nav');

      sideNav.classList.toggle('side-nav-show');
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
    const updatedFavorites = this.state.favorites.concat(newFavorites);
    this.setState({ favorites: updatedFavorites });
  },

  removeFavorite(removedFavorite) {
    const updatedFavorites = this.state.favorites.filter((favorite) => {
      let check;

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

    this.setState({ favorites: updatedFavorites });
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
        cookies: this.state.cookies,
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

    const { pathname } = this.props.location;
    const { loggedIn } = this.state.cookies;

    const showLogin = () => {
      if (!loggedIn) {
        return { display: 'inline-block' };
      }

      return { display: 'none' };
    };

    const showRegister = () => {
      if (!loggedIn) {
        return { display: 'inline-block' };
      }

      return { display: 'none' };
    };

    const showUpload = () => {
      if (!loggedIn && pathname !== '/add-pattern') {
        return { display: 'none' };
      }

      return { display: 'inline-block' };
    };

    const showLogout = () => {
      if (loggedIn) {
        return { display: 'inline-block' };
      }

      return { display: 'none' };
    };

    return <div>
      <div className="nav">
        <h1 className="title-long" onTouchTap={this.handleTitleTouchTap}>Free Pattern Warehouse</h1>
        <h1 className="title-short" onTouchTap={this.handleTitleTouchTap}>FPW</h1>

        <div className="search">
          <input type="text" />
          <button>Search</button>
        </div>

        <div className="nav-right">

          <button
            onTouchTap={this.handleTouchTapUpload}
            style={showUpload()}
          >
            <span>Upload</span>
          </button>

          <button
            onTouchTap={this.handleTouchTapLogin}
            style={showLogin()}
          >
            Login
          </button>

          <button
            onTouchTap={this.handleTouchTapRegister}
            style={showRegister()}
          >
            Register
          </button>

          <button
            onTouchTap={this.handleTouchTapProfile}
            style={showLogout()}
          >
            Profile
          </button>

          <button
            onTouchTap={this.handleTouchTapLogout}
            style={showLogout()}
          >
            Logout
          </button>
        </div>

        <i className="material-icons menu"
          id="menu"
          onTouchTap={this.handleTouchTapMenu}
        >
          menu
        </i>
        <div className="side-nav" id="side-nav">

          <button
            onTouchTap={this.handleTouchTapUpload}
            style={showUpload()}
          >
            <span>Upload</span>
          </button>

          <button
            onTouchTap={this.handleTouchTapLogin}
            style={showLogin()}
          >
            Login
          </button>

          <button
            onTouchTap={this.handleTouchTapRegister}
            style={showRegister()}
          >
            Register
          </button>

          <button
            onTouchTap={this.handleTouchTapProfile}
            style={showLogout()}
          >
            Profile
          </button>

          <button
            onTouchTap={this.handleTouchTapLogout}
            style={showLogout()}
          >
            Logout
          </button>

        </div>

      </div>

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
