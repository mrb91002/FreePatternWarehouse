import FontIcon from 'material-ui/FontIcon';
import React from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { withRouter } from 'react-router';

let hoveredPattern;

const headers = { headers:
  { 'Content-Type': 'application/json', Accept: 'application/json' }
};

const ProfilePage = React.createClass({
  getInitialState() {
    return {
      user: '',
      updatedUser: '',
      profilePatterns: '',
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
          `/api/patterns/${profileId}`

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
        });
      })
      .catch();
  },

  componentWillReceiveProps() {
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
          `/api/patterns/${profileId}`

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
        });
      })
      .catch();
  },

  handleEdit() {
    // console.log('edit mode activated');
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
    hoveredPattern = event.target.firstChild;
    // eslint-disable-next-line
    hoveredPattern.setAttribute('style', 'display: block; background-color: #fff; position: absolute; margin-top: 10px; margin-left: 10px; border-radius: 5px; padding: 5px 5px 2px 5px; box-shadow: rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px');
  },

  handleClickStar(event) {
    const fav = event.target.parentElement.getAttribute('data-patternId');
    const eventTarget = event.target;

    if (event.target.getAttribute('data-clicked') === 'false') {
      // if not logged in send user to login page
      if (!this.props.cookies.loggedIn) {
        return this.props.router.push('/login');
      }

      event.target.setAttribute('style', 'color: gold');
      event.target.setAttribute('data-clicked', 'true');

      axios.post('/api/favorites', { patternId: fav }, headers)
        .then((favorite) => {
          // conditional logic to see if they are logged in and on there page.
          Materialize.toast('Favorite Added', 2000, 'rounded');
        })
        .catch(() => {
          Materialize.toast('An Error has occured, please send us an email', 2000, 'rounded');
        });
    }
    else {
      // Delete favorite
      axios.delete(`/api/favorites/${fav}`, headers)
        .then(() => {
          eventTarget.setAttribute('style', 'color: rgb(173, 80, 87)');
          eventTarget.setAttribute('data-clicked', 'false');
          Materialize.toast('Favorite Removed', 2000, 'rounded');
        })
        .catch((err) => {
          console.log('hard fail', err)
        });
    }
  },

  handleMouseLeave() {
    console.log('mouse leave');
    hoveredPattern.setAttribute('style', 'display: none;');
  },

  render() {
    if (this.state.user.length === 0) {
      // console.log('returned empty BAD');
      return <div />;
    }

    // console.log(this.props);

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
      <div className="spacer" />
      <div className="pattern-title col s8 offset-s2">
        <h1>{this.state.updatedUser.userName} - Profile</h1>
      </div>
      <div className="row pattern-space">
        <div className="container">
          <div className="col s12 pattern-artist">
            <div className="col s5 profile-main">
              <div className="col s8">
                <img src="https://market.ionic.io/img/user-default.png" />
              </div>
              <div className="col s4">
                <p>{this.state.updatedUser.userName}</p>
                <p>Website</p>
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
                    // zIndex: 0
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
                return <div
                  className="col s5 offset-s1 pointer"
                  key={index}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onTouchTap={this.handlePatternClick}
                  // eslint-disable-next-line
                  style={{boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px', paddingTop: '10px', marginBottom: '20px' }}
                >
                  <div
                    data-patternId={pattern.id}
                    style={{ display: 'none' }}
                  >
                    <FontIcon
                      className="material-icons"
                      data-clicked="false"
                      data-patternId={pattern.id}
                      onTouchTap={this.handleClickStar}
                      style={{ color: 'rgb(173, 80, 87)' }}
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

              { this.props.favorites.map((pattern, index) => {
                return <div
                  className="col s5 offset-s1 pointer"
                  key={index}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onTouchTap={this.handlePatternClick}
                  // eslint-disable-next-line
                  style={{boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px', paddingTop: '10px', marginBottom: '20px' }}
                >
                  <div
                    data-patternId={pattern.id}
                    style={{ display: 'none' }}
                  >
                    <FontIcon
                      className="material-icons"
                      data-clicked="false"
                      data-patternId={pattern.id}
                      onTouchTap={this.handleClickStar}
                      style={{ color: 'rgb(173, 80, 87)' }}
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
