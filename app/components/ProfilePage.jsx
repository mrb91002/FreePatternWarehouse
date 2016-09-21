import React from 'react';
import axios from 'axios';

const ProfilePage = React.createClass({
  getInitialState() {
    return {
      user: '',
      profilePatterns: ''
    };
  },

  componentWillMount() {
    const userPage = window.location.href.split('/').pop();

    axios.get(`/api/users/${userPage}`,
      { headers:
        { 'Content-Type': 'application/json', Accept: 'application/json' }
      })
      .then((profile) => {
        const currentProfile = profile.data;
        const profileId = currentProfile.id;

        axios.get(`/api/patterns/${profileId}`,
          { headers:
            { 'Content-Type': 'application/json', Accept: 'application/json' }
          })
          .then((profilePatterns) => {
            this.setState({ user: currentProfile, profilePatterns });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch(() => {
        // console.error(err.response || err);
      });
  },

  componentDidMount() {
    $(window).scrollTop(0);
  },

  render() {
    if (this.state.user.length === 0) {
      return <div />;
    }

    return <div>
      <div className="spacer" />
      <div className="pattern-title col s8 offset-s2">
        <h1>OhSewMuch - Profile</h1>
      </div>
      <div className="row pattern-space">
        <div className="container">
          <div className="col s12 pattern-artist">
            <div className="col s5 profile-main">
              <div className="col s8">
                <img src="https://market.ionic.io/img/user-default.png" />
              </div>
              <div className="col s4">
                <p>Test User</p>
                <p>Website</p>
              </div>
            </div>
            <div className="col s7 profile-main">
              <div className="col s12">
                <div className="col s12 profile-about white">
                  <h1>About</h1>
                  <p>{this.state.user.aboutMe}</p>
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
