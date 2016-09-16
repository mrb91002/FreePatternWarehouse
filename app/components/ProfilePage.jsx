import React from 'react';

const ProfilePage = React.createClass({
  componentDidMount() {
    $(window).scrollTop(0);
  },

  render() {
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
                  <p>My name is Christine Benavides and the art of crafting, sewing and creating has always been among my favorite things to do. It is this passion that has brought me here today.  It all started when I was a little child and my mother showed me how to sew.  She started me off small, fixing a hem, repairing a button and eventualy adjusting a seam.  As I continued to practice I was filled with a sense of accomplishment and self empowerment that still drives me today.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col s4 space-20">
            <div className="col s12 pattern-square">
              <h5>My patterns</h5>
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
