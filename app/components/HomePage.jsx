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


    if (this.props.patterns.length === 0) {
      return <div />;
    }
    const patterns = this.props.patterns.data;

    if (!patterns) {
      return <p>failed</p>;
    }

    return <div>
      <div className="spacer" />

      <div className="main-hero">
        <div className="tagline">
          <h1>Whatever your skill level,</h1>
          <h1>Find your next project here</h1>
        </div>
          <img src="images/yarn2.png" />
      </div>

      <div className="about">

        <div className="about-container">
            <i className="material-icons styleIcons">search</i>
            <div className="about-detail">
            <p className="bold">Find Something you Love</p>
            <p>Our community has what <br /> you need to be inspired</p>
          </div>
        </div>

        <div className="about-container">
          <i className="material-icons styleIcons">print</i>
          <div className="about-detail">
            <p className="bold">  Print out your pattern</p>
            <p>No Download <br /> No login <br /> 100% free</p>
          </div>
        </div>

        <div className="about-container">
          <i className="material-icons styleIcons">done_all</i>
          <div className="about-detail">
            <p className="bold">Create something new</p>
            <p>Share it with the community <br /> and those you love</p>
          </div>
        </div>
      </div>

      <p>Explore</p>

      <div className="row">
        <Gallery
          patterns={patterns}
          favorites={this.props.favorites}
          addFavorite={this.props.addFavorite}
          removeFavorite={this.props.removeFavorite}
          handlePatternHover={this.props.handlePatternHover}
          cookies={this.props.cookies}
        />

      </div>

    </div>;
  }
});

export default HomePage;
