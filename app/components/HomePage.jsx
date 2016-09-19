import FlatButton from 'material-ui/FlatButton';
import Gallery from 'components/Gallery';
import React from 'react';
import TextField from 'material-ui/TextField';

const HomePage = React.createClass({
  render() {
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

    const styleSearchButton = {
      backgroundColor: '#AD5057',
      height: '30px',
      lineHeight: '27px',
      border: 'none',
      borderRadius: '0 3px 3px 0',
      display: 'inline-block',
      marginTop: '18px'
    };

    const styleIcons = {
      fontSize: '130px',
      color: '#AD5057'
    };

    const patterns = this.props.patterns.data;

    if (!patterns) {
      return <p>failed</p>;
    }

    return <div>
      <div className="spacer" />

      <div className="mainHero row">
        <div className="col s6">
          <div className="heroSearch">
            <h1>Whatever your skill level,</h1>
            <h1>Find your next project here</h1>
            <TextField
              id="heroSearchInput"
              inputStyle={styleTextField}
              underlineShow={false}
            />
            <FlatButton
              label="Search"
              style={styleSearchButton}
            />
          </div>
        </div>
        <div className="col s4 heroImg">
          <img
            height="230px"
            src="images/beard.png"
            width="10px"
          />
        </div>
      </div>

      <div className="row about">
        <div className="col s10 offset-s1 about-inner">

          <div className="col s4">
            <div className="col s3">
              <i className="material-icons" style={styleIcons}>search</i>
            </div>
            <div className="col s8 offset-s1">
              <p className="bold">Find Something you Love</p>
              <p>Our community has what you need to be inspired</p>
            </div>
          </div>

          <div className="col s4">
            <div className="col s3">
              <i className="material-icons" style={styleIcons}>print</i>
            </div>
            <div className="col s8 offset-s1">
              <p className="bold">  Print out your new pattern</p>
              <p>No Download <br /> No login <br /> 100% free</p>
            </div>
          </div>

          <div className="col s4">
            <div className="col s3">
              <i className="material-icons" style={styleIcons}>done_all</i>
            </div>
            <div className="col s8 offset-s1">
              <p className="bold">Create something new</p>
              <p>Our community has what you need to be inspired</p>
            </div>
          </div>

        </div>
      </div>

      <div className="row">
        <div className="col s1 offset-s1">
          <p>Explore</p>
        </div>
      </div>

      <div className="row">
        <div className="col s10 offset-s1">

          <Gallery
            patterns={patterns}
          />

        </div>
      </div>
    </div>;
  }
});

export default HomePage;
