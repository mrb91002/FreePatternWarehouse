import FontIcon from 'material-ui/FontIcon';
import React from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { withRouter } from 'react-router';

let hoveredPattern;
let hoveredId;
let hoveredStateLocation;

const headers = { headers:
  { 'Content-Type': 'application/json', Accept: 'application/json' }
};

const ProfilePage = React.createClass({
  getInitialState() {
    return {
      user: '',
      updatedUser: '',
      profilePatterns: '',
      profileFavorites: '',
      lockEdit: true,
      display: 'none',
      displayHeart: 'none',
      blurHeight: '0px'
    };
  },

  componentWillMount() {
    if (!this.props.favorites.length) {
      console.log('no favorites');
    }
    console.log('props', this.props);

    const userPage = window.location.href.split('/').pop();
    let currentProfile;

    axios.get(`/api/users/${userPage}`, headers)
      .then((profile) => {
        currentProfile = profile.data;
        const profileId = currentProfile.id;
        const urls = [
          `/api/patterns/${profileId}`,
          `/api/favorites/${profileId}`
          // `/api/SOMETHIRDQUERY/${profileId}`
        ];

        return Promise.all(urls.map((url) => {
          return axios.get(url, headers);
        }));
      })
      .then((profilePatterns) => {
        const newCurrentProfile = Object.assign({}, currentProfile);

        this.setState({
          user: currentProfile,
          updatedUser: newCurrentProfile,
          profilePatterns: profilePatterns[0],
          profileFavorites: profilePatterns[1]
        });
      })
      .catch();
  },

  componentWillReceiveProps() {
    const userPage = window.location.href.split('/').pop();
    let currentProfile;

    axios.get(`/api/users/${userPage}`, headers)
      .then((profile) => {
        currentProfile = profile.data;
        const profileId = currentProfile.id;
        const urls = [
          `/api/patterns/${profileId}`,
          `/api/favorites/${profileId}`

          //  `/api/SOMETHIRDQUERY/${profileId}`
        ];

        return Promise.all(urls.map((url) => {
          return axios.get(url, headers);
        }));
      })
      .then((profilePatterns) => {
        const newCurrentProfile = Object.assign({}, currentProfile);

        this.setState({
          user: currentProfile,
          updatedUser: newCurrentProfile,
          profilePatterns: profilePatterns[0],
          profileFavorites: profilePatterns[1]
        });

        this.forceUpdate();
      })
      .catch();
  },

  handleEdit() {
    const newBlurHeight = $(document).height();

    this.setState({ lockEdit: false,
       display: 'block', blurHeight: newBlurHeight });
  },

  handleChange(event) {
    const { name, value } = event.target;
    const nextUser = Object.assign({}, this.state.updatedUser,
      { [name]: value });

    this.setState({ updatedUser: nextUser });
  },

  handleLockField() {
    const newUpdatedUser = this.state.updatedUser;

    if (_.isEqual(this.state.user, this.state.updatedUser)) {
      Materialize.toast('NO UPDATE', 2000, 'rounded');
    }
    else {
      axios.patch('/api/users/', { aboutMe: this.state.updatedUser.aboutMe },
        headers)
        .then(() => {
          Materialize.toast('Profile Updated', 2000, 'rounded');
        })
        .catch();
    }

    this.setState({ lockEdit: true, user: newUpdatedUser,
      updatedUser: newUpdatedUser, display: 'none' });
  },

  handlePatternClick(event) {
    if (!event.target.id) {
      return;
    }

    this.props.router.push(`/pattern/${event.target.id}`);
  },

  handleMouseEnter(event) {
     hoveredId = event.currentTarget.id;
     hoveredStateLocation =
      event.currentTarget.getAttribute('data-statelocation');

    const updatedState = this.state[hoveredStateLocation].data.map((pattern) =>
    {
      if (parseInt(pattern.id) === parseInt(hoveredId)) {
        pattern.display = 'block';
      }

      return pattern;
    });

    this.setState({ hoveredStateLocation: updatedState });
  },

  handleMouseLeave() {
    const updatedState = this.state[hoveredStateLocation].data.map((pattern) =>
    {
      if (parseInt(pattern.id) === parseInt(hoveredId)) {
        pattern.display = 'none';
      }

      return pattern;
    });

    this.setState({ hoveredStateLocation: updatedState });
  },

  handleClickStar(event) {
    // changed event.traget to event.current target
    // and removed the .parentElement
    console.log('event.target', event.target);
    console.log('event.currentTarget', event.currentTarget.getAttribute('data-clicked'));
    const fav = event.currentTarget.getAttribute('data-patternId');
    const eventTarget = event.currentTarget;

    if (event.currentTarget.getAttribute('data-clicked') === 'false') {
      // if not logged in send user to login page
      if (!this.props.cookies.loggedIn) {
        return this.props.router.push('/login');
      }
      // Add favorite
      axios.post('/api/favorites', { patternId: fav }, headers)
        .then((favorite) => {
          Materialize.toast('Favorite Added', 2000, 'rounded');
          favorite.data.display = 'none';

          this.props.addFavorite(favorite.data);
        })
        .catch((err) => {
          Materialize.toast('An Error has occured, please send us an email', 2000, 'rounded');
        });
    }
    else {
      // Delete favorite
      axios.delete(`/api/favorites/${fav}`, headers)
        .then((deleted) => {
          console.log('deleted', deleted.data);
          Materialize.toast('Favorite Removed', 2000, 'rounded');
          this.props.removeFavorite(deleted.data);
        })
        .catch((err) => {
          console.log('hard fail', err)
        });
    }
  },

  render() {
    if (this.state.user.length === 0) {
      return <div />;
    }

    if (!this.props.favorites) {
      return <div />
    }

console.log(this.props.favorites);

    const urlPage = window.location.href.split('/').pop();

    const showEdit = () => {
      if (this.props.cookies.loggIn !== '') {
        if (this.props.cookies.loggedIn.userName === urlPage) {
          return { display: 'block' };
        }

        return { display: 'none' };
      }
    };

    const editIcon = {
      color: 'rgb(173, 80, 87)',
      cursor: 'pointer',
      display: 'none'
    };

    return <div>
    {console.log(this.state.updatedUser.userImageUrl)}
      <div className="spacer" />
      <div className="pattern-title col s8 offset-s2">
        <h1>{this.state.updatedUser.userName} - Profile</h1>
      </div>
      <div className="row pattern-space">
        <div className="container">
          <div className="col s12 pattern-artist">
            <div className="col s5 profile-main">
              <div className="col s8">
                <img src={this.state.updatedUser.userImageUrl} />
              </div>
              <div className="col s4">
                <p>{this.state.updatedUser.userName}</p>
                <p><a
                style={{ color: '#2a5cb9', fontWeight: 'bold'}}
                target="_blank"
                href="https://mrb91002-ohsewmuch.herokuapp.com/">Website</a></p>
              </div>
            </div>
            <div className="col s7 profile-main">
              <div className="col s12">
              {/* this div below creates about blur affect */}
                <div
                  onTouchTap={this.handleLockField}
                  style={{
                    backgroundColor: 'rgba(256,256,256,.7)',
                    display: `${this.state.display}`,
                    height: `${this.state.blurHeight}px`,
                    left: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%'
                  }}
                />
                <div
                  className="col s12 profile-about white"
                  style={{
                    backgroundColor: 'white',
                    position: 'relative'
                  }}
                >
                  <p style={{ float: 'right' }}>
                    <FontIcon
                      className="material-icons"
                      onTouchTap={this.handleEdit}
                      style={Object.assign({}, editIcon, showEdit())}
                    >
                      mode_edit
                    </FontIcon>
                  </p>
                  <h1>About</h1>
                  <TextField
                    disabled={this.state.lockEdit}
                    fullWidth={true}
                    id={'aboutText'}
                    multiLine={true}
                    name="aboutMe"
                    onBlur={this.handleLockField}
                    onChange={this.handleChange}
                    textareaStyle={{ color: 'black', cursor: 'default' }}
                    underlineShow={false}
                    value={this.state.updatedUser.aboutMe}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col s4 space-20">
            <div className="col s12 pattern-square">
              <h5>My patterns</h5>
              <div className="col s11">

              { this.state.profilePatterns.data.map((pattern, index) => {
                // console.log('Current Favorites', this.props.favorites);
                let clicked;
                let starColor;
                // check each pattern against the logged in user's favorites
                const favoriteCheck =
                  this.props.favorites.filter((favorite) => {
                  if (favorite.patternName === pattern.patternName) {
                    return true
                  }
                  else {
                    return false
                  }
                });

                if (favoriteCheck.length) {
                  clicked = 'true';
                  starColor = 'gold';
                }
                else {
                  clicked = 'false';
                  starColor = 'rgb(173, 80, 87)';
                }

                return <div
                  data-stateLocation="profilePatterns"
                  id={pattern.id}
                  className="col s5 offset-s1 pointer"
                  key={index}
                  onMouseOver={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onTouchTap={this.handlePatternClick}
                  // eslint-disable-next-line
                  style={{boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px', paddingTop: '10px', marginBottom: '20px' }}
                >
                  <div
                    data-clicked={clicked} //new
                    data-patternId={pattern.id}
                    onTouchTap={this.handleClickStar} // moved from Icon
                    style={{ display: `${pattern.display}`,
                            backgroundColor: '#fff',
                            position: 'absolute',
                            marginTop: '10px',
                            marginLeft: '10px',
                            borderRadius: '5px',
                            padding: '5px 5px 2px 5px',
                            boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
                    }}>
                    <FontIcon
                      className="material-icons"
                      data-clicked={clicked}
                      // data-clicked="false"
                      data-patternId={pattern.id}
                      // onTouchTap={this.handleClickStar}
                      style={{ color: starColor }}

                    >
                      stars
                    </FontIcon>
                  </div>

                  <img
                    alt={pattern.altText}
                    id={pattern.id}
                    src={pattern.imageUrl}
                  />
                  <p
                    className="center no-top-margin"
                    id={pattern.id}
                  >
                    {pattern.patternName}
                  </p>
                </div>;
              })}

              </div>

            </div>
          </div>
          <div className="col s4 space-20">
            <div className="col s12 pattern-square">
              <h5>My favorites</h5>

              {this.state.profileFavorites.data.map((pattern, index) => {
                let clicked;
                let starColor

                // check each pattern against the logged in user's favorites
                const favoriteCheck =
                  this.props.favorites.filter((favorite) => {
                  if (favorite.patternName === pattern.patternName) {
                    return true
                  }
                  else {
                    return false
                  }
                });

                if (favoriteCheck.length) {
                  clicked = 'true';
                  starColor = 'gold';
                }
                else {
                  clicked = 'false';
                  starColor = 'rgb(173, 80, 87)';
                }

                return <div
                  data-stateLocation="profileFavorites"
                  id={pattern.id}
                  className="col s5 offset-s1 pointer"
                  key={index}
                  onMouseOver={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onTouchTap={this.handlePatternClick}
                  // eslint-disable-next-line
                  style={{boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px', paddingTop: '10px', marginBottom: '20px' }}
                >
                  <div
                  data-clicked={clicked} //new
                  data-patternId={pattern.id}
                  onTouchTap={this.handleClickStar} // moved from Icon
                  style={{ display: `${pattern.display}`,
                          backgroundColor: '#fff',
                          position: 'absolute',
                          marginTop: '10px',
                          marginLeft: '10px',
                          borderRadius: '5px',
                          padding: '5px 5px 2px 5px',
                          boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
                    }}>
                    <FontIcon
                      className="material-icons"
                      data-clicked={clicked}
                      data-patternId={pattern.id}
                      // onTouchTap={this.handleClickStar}
                      style={{ color: starColor }}

                    >
                      stars
                    </FontIcon>
                  </div>

                  <img
                    alt={pattern.altText}
                    id={pattern.id}
                    src={pattern.imageUrl}
                  />
                  <p
                    className="center no-top-margin"
                    id={pattern.id}
                  >
                    {pattern.patternName}
                  </p>
                </div>;
              })}

            </div>
          </div>
          <div className="col s4 space-20">
            <div className="col s12 pattern-square">
              <h5>My favorite artists</h5>
              <div className="col s6">
                <img src="https://market.ionic.io/img/user-default.png" />
              </div>
              <div className="col s6">
                <img src="https://market.ionic.io/img/user-default.png" />
              </div>
              <div className="col s6">
                <img src="https://market.ionic.io/img/user-default.png" />
              </div>
              <div className="col s6">
                <img src="https://market.ionic.io/img/user-default.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        this is a footer
      </footer>
    </div>;
  }
});

export default withRouter(ProfilePage);
