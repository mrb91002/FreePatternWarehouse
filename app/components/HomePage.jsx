import React from 'react';
import PatternInSearch from 'components/PatternInSearch';
import weakKey from 'weak-key';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const HomePage = React.createClass({
  // contextTypes: {
  //   muiTheme: React.PropTypes.object.isRequired
  // },

  render() {
    // const styleUpperHero = {
    //   backgroundColor: '#79A2C1',
    //   width: '100%',
    //   height: '64px'
    // }

    const styleTextField = {
      backgroundColor: '#fff',
      borderRadius: '3px 0 0 3px',
      height: '10px',
      marginTop: '18px',
      border: 'none',
      padding: '10px',
      display: 'inline-block',
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
      color: '#AD5057',
      // color: '#F3F5F6'
    };

    let patterns  = this.props.patterns.data;

    if (!patterns) {
      return <p>failed</p>
    }

    console.log('render home page');
    console.log(patterns);

    return <div>
      <div className="upperHero">
        <p>Explore</p>
        <p>Trending</p>
      </div>

      <div className="mainHero row">
        <div className="col s6">
          <div className="heroSearch">
            <h1>Whatever your skill level,</h1>
            <h1>Find your next project here</h1>
            <TextField
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
          <img src="images/beard.png" height="230px" width="10px" />
        </div>
      </div>

      <div className="row about">
        <div className="col s10 offset-s1 about-inner">

          <div className="col s4">
            <div className="col s4">
              <i className="material-icons" style={styleIcons}>search</i>
            </div>
            <div className="col s7">
              <p><strong>Find Something you Love </strong></p>
              <p>Our community has what you need to be inspired</p>
            </div>
          </div>

          <div className="col s4">
            <div className="col s4">
              <i className="material-icons" style={styleIcons}>print</i>
            </div>
            <div className="col s7">
              <p><strong>  Print out your new pattern </strong></p>
              <p>No Download <br/> No login <br/> 100% free</p>
            </div>
          </div>

          <div className="col s4">
            <div className="col s4">
              <i className="material-icons" style={styleIcons}>done_all</i>
            </div>
            <div className="col s7">
              <p><strong> Create something new </strong> </p>
              <p>Our community has what you need to be inspired</p>
            </div>
          </div>

        </div>
      </div>

        <div className="row">
          <div className="col s1 offset-s1">
            Explore
          </div>
          <div className="col s10 offset-s1">
            <div className="col s3 blue">
              s3
              {patterns.map((pattern) => {
                if (pattern.displayOrder !== 1) {
                  return;
                }
                return <PatternInSearch
                  key={weakKey(pattern)}
                  pattern={pattern}
                />
              })}
            </div>
            <div className="col s3 green">
              s3
              {patterns.map((pattern) => {
                if (pattern.displayOrder !== 1) {
                  return;
                }
                return <PatternInSearch
                  key={weakKey(pattern)}
                  pattern={pattern}
                />
              })}
            </div>
            <div className="col s3 red">
              s3
              {patterns.map((pattern) => {
                if (pattern.displayOrder !== 1) {
                  return;
                }
                return <PatternInSearch
                  key={weakKey(pattern)}
                  pattern={pattern}
                />
              })}
            </div>
            <div className="col s3 purple">
              s3
              {patterns.map((pattern) => {
                if (pattern.displayOrder !== 1) {
                  return;
                }
                return <PatternInSearch
                  key={weakKey(pattern)}
                  pattern={pattern}
                />
              })}
            </div>
          </div>
        </div>


      {/* {patterns.map((pattern) => {
        if (pattern.displayOrder !== 1) {
          return;
        }
        return <PatternInSearch
          key={weakKey(pattern)}
          pattern={pattern}
        />
      })} */}

    </div>;
  }
});

export default HomePage;
