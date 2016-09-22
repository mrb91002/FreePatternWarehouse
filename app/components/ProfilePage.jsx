import FontIcon from 'material-ui/FontIcon';
import React from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';

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
        const profileId = currentProfile.id;

        return axios.get(`/api/patterns/${profileId}`,
          { headers:
            { 'Content-Type': 'application/json', Accept: 'application/json' }
          });
      })
      .then((profilePatterns) => {
        const newCurrentProfile = Object.assign({}, currentProfile);

        this.setState({ user: currentProfile, updatedUser: newCurrentProfile, profilePatterns });

      })
      .catch(() => {
        // console.error(err.response || err);
      });
  },

  componentDidMount() {
    $(window).scrollTop(0);
  },

  handleEdit() {
    console.log('edit mode activated');
    const newBlurHeight = $(document).height();

    this.setState({ lockEdit: false, display: 'block', blurHeight: newBlurHeight });
  },

  handleEnter(event) {
    if (event.which !== 13) {
      return;
    }

    this.setState({ lockEdit: true });
  },

  handleLockField(event) {
    const newAbout = event.target.value;
    let newUpdatedUser = this.state.updatedUser;

    newUpdatedUser.aboutMe = newAbout;

    this.setState({ lockEdit: true, updatedUser: newUpdatedUser, display: 'none' });

    if (_.isEqual(this.state.user, this.state.updatedUser)) {
      console.log('OBJECTS ARE THE SAME');
    }
    else {
      console.log('OBJECT HAVE CHANGED');
      Materialize.toast('You Updated Your Profile', 2000, 'rounded');

    }

  },

  render() {
    if (this.state.user.length === 0) {
      console.log('returned empty BAD');
      return <div />;
    }

    console.log(this.state.user);

    if (_.isEqual(this.state.user, this.state.updatedUser)) {
      console.log('OBJECTS ARE THE SAME');
    }
    else {
      console.log('OBJECT HAVE CHANGED');
    }

    const urlPage = window.location.href.split('/').pop();

    const showEdit = () => {
      if (this.props.cookies.loggedIn.userName === urlPage) {
          return { display: 'block' };
      }
    }

    const editIcon = {
      color: 'rgb(173, 80, 87)',
      cursor: 'pointer',
      display: 'none'
    }

    console.log('cookies', this.props.cookies);

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
                <div className="blurIt" style={{
                  backgroundColor: 'rgba(256,256,256,.7)',
                  // filter: blur('5px'),
                  // filter:invert('100%'),
                  position: 'absolute',
                  width: '100%',
                  height: `${this.state.blurHeight}`,
                  top:0,
                  left:0,
                  zIndex: 0,
                  display: `${this.state.display}`
                }}
                onTouchTap={this.handleLockField}
                ></div>
                <div className="col s12 profile-about white"
                  style={{
                    zIndex:998,
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
                    defaultValue={this.state.user.aboutMe}
                    disabled={this.state.lockEdit}
                    fullWidth={true}
                    multiLine={true}
                    textareaStyle={{ color: 'black', cursor: 'default',
                    // zIndex: 999,
                    // position: 'relative',
                    // backgroundColor: 'white'
                    }}
                    underlineShow={false}
                    onBlur={this.handleLockField}
                    onKeyUp={this.handleEnter}
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
                return <div className="col s6" key={index}>
                  <img alt={pattern.altText} src={pattern.imageUrl} />
                  <p className="center no-top-margin">{pattern.patternName}</p>
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

export default ProfilePage;
