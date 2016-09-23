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
      profileFavorites: '',
      lockEdit: true,
      display: 'none',
      displayHeart: 'none',
      blurHeight: '0px'
    };
  },

  componentWillMount() {
    const headers = { headers:
      { 'Content-Type': 'application/json', Accept: 'application/json' }
    };
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
    const headers = { headers:
      { 'Content-Type': 'application/json', Accept: 'application/json' }
    };
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

  handleEdit() {
    // console.log('edit mode activated');
    const newBlurHeight = $(document).height();

    this.setState({ lockEdit: false,
       display: 'block', blurHeight: newBlurHeight });
  },

  handleChange(event) {
    const { name, value } = event.target
    const nextUser = Object.assign({}, this.state.updatedUser, { [name]: value });

    this.setState({ updatedUser: nextUser });
  },

  handleLockField(event) {
    // const newAbout = event.target.value;
    const newUpdatedUser = this.state.updatedUser;

    // newUpdatedUser.aboutMe = newAbout;

       console.log('LOCKED');

      if (_.isEqual(this.state.user, this.state.updatedUser)) {
          Materialize.toast('NO UPDATE', 2000, 'rounded');
    }
    else {
      axios.patch('/api/users/', { aboutMe: this.state.updatedUser.aboutMe },
        { headers:
          { 'Content-Type': 'application/json', Accept: 'application/json' }
        })
        .then((update) => {
          Materialize.toast('Profile Updated', 2000, 'rounded');
        })
        .catch()
    }

    this.setState({ lockEdit: true, user: newUpdatedUser, updatedUser: newUpdatedUser,
      display: 'none' });
  },

  handlePatternClick(event) {
    if (!event.target.id) {
      return;
    }

    this.props.router.push(`/pattern/${event.target.id}`);
  },

  handleMouseEnter(event) {
    hoveredPattern = event.target.firstChild;
    hoveredPattern.setAttribute('style',
    'display: block; background-color: #fff; position: absolute; margin-top: 10px; margin-left: 10px; border-radius: 5px; padding: 5px 5px 2px 5px; box-shadow: rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px');
  },

  handleClickStar(event) {

    if (!event.target.getAttribute('clicked')) {
      event.target.setAttribute('clicked', false);
    }

    if (event.target.getAttribute('clicked') === 'false' ) {
      // if not logged in send user to logged in page
      if (!this.props.cookies.loggedIn) {
        this.props.router.push('/login');
      }
      event.target.setAttribute('style', 'color: gold');
      event.target.setAttribute('clicked', true);
      let newFave = event.target.parentElement.getAttribute('data-patternId')

      axios.post('/api/favorites', { patternId: newFave }, headers)
        .then((favorite) => {

          // conditional logic to see if they are logged in and on there page.

          Materialize.toast('Favorite Added', 2000, 'rounded');
        })
        .catch((err) => {
          Materialize.toast('Already A Favorite', 2000, 'rounded');
        });
    }
    else {
      event.target.setAttribute('style', 'color: rgb(173, 80, 87)');
      event.target.setAttribute('clicked', false);
    }
  },

  handleMouseLeave() {
    console.log('mouse leave');
    hoveredPattern.setAttribute('style', 'display: none;');

  },

  render() {
    // console.log('state', this.state);

    if (this.state.user.length === 0) {
      // console.log('returned empty BAD');
      return <div />;
    }

    // console.log(this.state.user);

    // if (_.isEqual(this.state.user, this.state.updatedUser)) {
    //   // console.log('OBJECTS ARE THE SAME');
    // }
    // else {
    //   console.log('OBJECT HAVE CHANGED');
    // }

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
                <div
                  className="blurIt"
                  onTouchTap={this.handleLockField}
                  style={{
                    backgroundColor: 'rgba(256,256,256,.7)',
                    display: `${this.state.display}`,
                    height: `${this.state.blurHeight + 'px'}`,
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
                    value={this.state.updatedUser.aboutMe}
                    // defaultValue={this.state.user.aboutMe}
                    disabled={this.state.lockEdit}
                    name="aboutMe"
                    fullWidth={true}
                    id={'aboutText'}
                    multiLine={true}
                    onBlur={this.handleLockField}
                    onChange={this.handleChange}
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
              <div className="col s11">

              { this.state.profilePatterns.data.map((pattern, index) => {
                return <div
                  className="col s5 offset-s1 pointer"
                  style={{boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px', paddingTop: '10px', marginBottom: '20px' }}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  key={index}
                  onTouchTap={this.handlePatternClick}
                >
                <div
                  style={{ display: 'none' }}
                  data-patternId={pattern.id}
                >
                  <FontIcon
                    className="material-icons"
                    clicked="false"
                    data-patternId={pattern.id}
                    style={{ color: 'rgb(173, 80, 87)' }}
                    onTouchTap={this.handleClickStar}
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

              { this.state.profileFavorites.data.map((pattern, index) => {
                return <div
                  className="col s6 pointer"
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
