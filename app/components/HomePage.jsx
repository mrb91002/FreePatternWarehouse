import React from 'react';
import PatternInSearch from 'components/PatternInSearch';
import weakKey from 'weak-key';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

let col1 = 0;
let col2 = 0;
let col3 = 0;
let col4 = 0;
let number = 1;
// let patterntest  = this.props.patterns.data;

const HomePage = React.createClass({
  // contextTypes: {
  //   muiTheme: React.PropTypes.object.isRequired
  // },

  componentWillReceiveProps() {
    $('#collumn1').append(1);

    console.log('NEW REVEIVING PROPS');
    // this.forceUpdate();
},

  calculateCollumn(patternClip) {
    if( $('#collumn1').height() <= $('#collumn2').height() &&
      $('#collumn1').height() <= $('#collumn3').height() &&
      $('#collumn1').height() <= $('#collumn4').height()
    ) {
      $('#collumn1').append(patternClip);
      return;
    }

    else if( $('#collumn2').height() <= $('#collumn3').height() &&
      $('#collumn2').height() <= $('#collumn4').height()
    ) {
      $('#collumn2').append(`${patternClip}`);
      return;
    }

    else if( $('#collumn3').height() <= $('#collumn4').height()
    ) {
      $('#collumn3').append(`${patternClip}`);
      return;
    }

    else {
      $('#collumn4').append(`${patternClip}`);
      return;
    }
  },


  componentDidMount() {
    console.log('componentDidMount');
    $('#collumn1').append(1);
    $('#collumn1').append(1);
    $('#collumn1').append(1);
    $('#collumn1').append(1);
    // $('#collumn3').append('<h1>test</h1>');
    // $('#collumn3').append('<h1>test</h1>');
    // $('#collumn3').append('<h1>test</h1>');
    // $('#collumn3').append('<h1>test</h1>');
    // $('#collumn3').append('<h1>test</h1>');
    // $('#collumn3').append('<h1>test</h1>');
    // $('#collumn3').append('<h1>test</h1>');
    // $('#collumn3').append('<h1>test</h1>');
    // $('#collumn3').append('<h1>test</h1>');
  },

  render() {
    console.log('initial homepage render');

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
      console.log('RAN THROUGH AND NO DATA');
      return <p>failed</p>
    }

    console.log('render home page');
    console.log(patterns);
    $('#collumn1').append(1);

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
              <p>No Download <br/> No login <br/> 100% free</p>
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
            Explore
          </div>
          <div className="col s10 offset-s1">
            <div className="col s3 blue" id="collumn1">
              s3
            </div>
            <div className="col s3 green" id="collumn2" >
              s3
            </div>
            <div className="col s3 red" id="collumn3">
              s3
            </div>
            <div className="col s3 purple" id="collumn4">
              s3
            </div>
          </div>
        </div>

        {console.log('made it')}

        { patterns.map((pattern) => {
          if (pattern.displayOrder !== 1) {
            return;
          }

          this.calculateCollumn(`<div>
              <img src=${pattern.imageUrl} alt=${pattern.altText} id=${pattern.id} />
              ${pattern.patternName}
              ${pattern.userName}
              ${pattern.id}
            </div>`);
          return;
        })}

        { patterns.map((pattern) => {
          if (pattern.displayOrder !== 1) {
            return;
          }

          this.calculateCollumn(`<div>
              <img src=${pattern.imageUrl} alt=${pattern.altText} id=${pattern.id} />
              ${pattern.patternName}
              ${pattern.userName}
              ${pattern.id}
            </div>`);
          return;
        })}

        { patterns.map((pattern) => {
          if (pattern.displayOrder !== 1) {
            return;
          }

          this.calculateCollumn(`<div>
              <img src=${pattern.imageUrl} alt=${pattern.altText} id=${pattern.id} />
              ${pattern.patternName}
              ${pattern.userName}
              ${pattern.id}
            </div>`);
          return;
        })}

        { patterns.map((pattern) => {
          if (pattern.displayOrder !== 1) {
            return;
          }

          this.calculateCollumn(`<div>
              <img src=${pattern.imageUrl} alt=${pattern.altText} id=${pattern.id} />
              ${pattern.patternName}
              ${pattern.userName}
              ${pattern.id}
            </div>`);
          return;
        })}

    </div>;
  }
});

export default HomePage;
