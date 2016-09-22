import FontIcon from 'material-ui/FontIcon';
import React from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { withRouter } from 'react-router';

const ProfilePage = React.createClass({
  getInitialState() {
    return {
      user: '',
      updatedUser: '',
      profilePatterns: '',
      lockEdit: true,
      display: 'none',
      blurHeight: '0px'
    };
  },

  componentWillMount() {
    const userPage = window.location.href.split('/').pop();
    let currentProfile;

    axios.get(`/api/users/${userPage}`,
      { headers:
        { 'Content-Type': 'application/json', Accept: 'application/json' }
      })
      .then((profile) => {
        currentProfile = profile.data;
        console.log(currentProfile);
        const profileId = currentProfile.id;

        // console.log('currentProfile', currentProfile);
        return axios.get(`/api/patterns/${profileId}`,
          { headers:
            { 'Content-Type': 'application/json', Accept: 'application/json' }
          });
      })
      .then((profilePatterns) => {
        // console.log('profilepatterns', profilePatterns);
        const newCurrentProfile = Object.assign({}, currentProfile);

        console.log('original', currentProfile);
        console.log('new', newCurrentProfile);

        this.setState({ user: currentProfile,
           updatedUser: newCurrentProfile, profilePatterns });
      })
      .catch(() => {
        // console.error(err.response || err);
      });
  },

  componentWillReceiveProps() {
    // $(window).scrollTop(0);

    const userPage = window.location.href.split('/').pop();
    let currentProfile;

    axios.get(`/api/users/${userPage}`,
      { headers:
        { 'Content-Type': 'application/json', Accept: 'application/json' }
      })
      .then((profile) => {
        currentProfile = profile.data;
        const profileId = currentProfile.id;

        // console.log('currentProfile', currentProfile);
        return axios.get(`/api/patterns/${profileId}`,
          { headers:
            { 'Content-Type': 'application/json', Accept: 'application/json' }
          });
      })
      .then((profilePatterns) => {
        // console.log('profilepatterns', profilePatterns);
        const newCurrentProfile = Object.assign({}, currentProfile);

        console.log('original2', currentProfile);
        console.log('new2', newCurrentProfile);

        this.setState({ user: currentProfile,
           updatedUser: newCurrentProfile, profilePatterns });
      })
      .catch(() => {
        // console.error(err.response || err);
      });
  },

  handleEdit() {
    // console.log('edit mode activated');
    const newBlurHeight = $(document).height();

    this.setState({ lockEdit: false,
       display: 'block', blurHeight: newBlurHeight });
  },

  handleEnter(event) {
    if (event.which !== 13) {
      return;
    }

    this.setState({ lockEdit: true });
  },

  handleLockField(event) {
    const newAbout = event.target.value;
    const newUpdatedUser = this.state.updatedUser;

    newUpdatedUser.aboutMe = newAbout;

    this.setState({ lockEdit: true, updatedUser: newUpdatedUser,
       display: 'none' });

    if (_.isEqual(this.state.user, this.state.updatedUser)) {
      // console.log('OBJECTS ARE THE SAME');
    }
    else {
      // console.log('OBJECT HAVE CHANGED');
      Materialize.toast('You Updated Your Profile', 2000, 'rounded');
    }
  },

  handlePatternClick(event) {
    if (!event.target.id) {
      return;
    }

    this.props.router.push(`/pattern/${event.target.id}`);
  },

  render() {
    // console.log('state', this.state);
    if (this.state.user.length === 0) {
      // console.log('returned empty BAD');
      return <div />;
    }

    // console.log(this.state.user);

    if (_.isEqual(this.state.user, this.state.updatedUser)) {
      // console.log('OBJECTS ARE THE SAME');
    }
    else {
      console.log('OBJECT HAVE CHANGED');
    }

    const urlPage = window.location.href.split('/').pop();

    const showEdit = () => {

    if (this.props.cookies.loggIn !== '') {
      if (this.props.cookies.loggedIn.userName === urlPage) {
        return { display: 'block' };
      }

        return { display: 'none' };
      }
    }

    const editIcon = {
      color: 'rgb(173, 80, 87)',
      cursor: 'pointer',
      display: 'none'
    };

    return <div>
      <div className="spacer" />
      <div className="pattern-title col s8 offset-s2">
        <h1>{this.state.user.userName} - Profile</h1>
      </div>
      <div className="row pattern-space">
        <div className="container">
          <div className="col s12 pattern-artist">
            <div className="col s5 profile-main">
              <div className="col s8">
                <img src="https://market.ionic.io/img/user-default.png" />
              </div>
              <div className="col s4">
                <p>{this.state.user.userName}</p>
                <p>Website</p>
              </div>
            </div>
            <div className="col s7 profile-main">
              <div className="col s12">
                <div
                  className="blurIt"
                  onTouchTap={this.handleLockField}
                  style={{
                    backgroundColor: 'rgba(256,256,256,.7)',
                    display: `${this.state.display}`,
                    height: `${this.state.blurHeight}`,
                    left: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    zIndex: 0
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
                    value={this.state.user.aboutMe}
                    disabled={this.state.lockEdit}
                    fullWidth={true}
                    id={'aboutText'}
                    multiLine={true}
                    onBlur={this.handleLockField}
                    onKeyUp={this.handleEnter}
                    textareaStyle={{ color: 'black', cursor: 'default' }}
                    underlineShow={false}
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

              { this.state.profilePatterns.data.map((pattern, index) => {
                return <div
                  className="col s6"
                  key={index}
                  onTouchTap={this.handlePatternClick}
                >
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
              <h5>My favorites</h5>
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
