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

  // componentWillReceiveProps() {
  //   this.props.patterns.map((pattern) => {
  //     if (pattern.displayOrder !== 1) {
  //       return;
  //     }
  //
  //     this.calculateCollumn(`<div class="home-tile">
  //         <img src=${pattern.imageUrl}
  //           alt=${pattern.altText}
  //           id=${pattern.id}
  //           class="pattern-image"
  //           onclick="myFunction(event)"
  //         />
  //         <p>${pattern.patternName}</p>
  //         <img src=${pattern.userImageUrl} alt="default user image" class="user-image-small"/>
  //         <h1>${pattern.userName}</h1>
  //       </div>`);
  //     return;
  //   })
  // },

  // componentWillMount() {
  //    this.props.patterns.map((pattern) => {
  //     if (pattern.displayOrder !== 1) {
  //       return;
  //     }
  //
  //     this.calculateCollumn(`<div class="home-tile">
  //         <img src=${pattern.imageUrl}
  //           alt=${pattern.altText}
  //           id=${pattern.id}
  //           class="pattern-image"
  //           onclick="myFunction(event)"
  //         />
  //         <p>${pattern.patternName}</p>
  //         <img src=${pattern.userImageUrl} alt="default user image" class="user-image-small"/>
  //         <h1>${pattern.userName}</h1>
  //       </div>`);
  //     return;
  //   })
  // },

  render() {
    console.log(this.props.patterns.data);

    // const myFunction = () => {
    //   console.log('please work');
    // }
    // getElementsByTagName('img').addEventListener("click", myFunction);

    // $('img').addEventListener("click", myFunction);

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
      return <p>failed</p>
    }

    return <div>
      {/* <div className="upperHero">
        <p>Explore</p>
        <p>Trending</p>
      </div> */}
      <div className="spacer"></div>

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
            <p>Explore</p>
          </div>
          <div className="col s10 offset-s1">

            <div className="col s3" id="collumn1">
            </div>

            <div className="col s3" id="collumn2" >
            </div>

            <div className="col s3" id="collumn3">
            </div>

            <div className="col s3" id="collumn4">
            </div>

          </div>
        </div>

        {console.log('made it')}



        { patterns.map((pattern) => {

          this.calculateCollumn(`<div class="home-tile">
              <img src=${pattern.images[0].imageUrl}
                alt=${pattern.images[0].altText}
                id=${pattern.id}
                class="pattern-image"
                onclick="myFunction(event)"
              />
              <p>${pattern.patternName}</p>
              <img src=${pattern.userImageUrl} alt="default user image" class="user-image-small"/>
              <h1>${pattern.userName}</h1>
            </div>`);
          return;
        })}

        { patterns.map((pattern) => {
          // if (pattern.displayOrder !== 1) {
          //   return;
          // }



          this.calculateCollumn(`<div class="home-tile">
              <img src=${pattern.images[0].imageUrl}
                alt=${pattern.altText}
                id=${pattern.id}
                class="pattern-image"
                onclick="myFunction(event)"
              />
              <p>${pattern.patternName}</p>
              <img src=${pattern.userImageUrl} alt="default user image" class="user-image-small"/>
              <h1>${pattern.userName}</h1>
            </div>`);
          return;
        })}

        { patterns.map((pattern) => {
          // if (pattern.displayOrder !== 1) {
          //   return;
          // }



          this.calculateCollumn(`<div class="home-tile">
              <img src=${pattern.images[0].imageUrl}
                alt=${pattern.altText}
                id=${pattern.id}
                class="pattern-image"
                onclick="myFunction(event)"
              />
              <p>${pattern.patternName}</p>
              <img src=${pattern.userImageUrl} alt="default user image" class="user-image-small"/>
              <h1>${pattern.userName}</h1>
            </div>`);
          return;
        })}

    </div>;
  }
});

// console.log('things are happening');
//
// $('img').on('click', () => {
//   console.log('you clicked an image!!!!!');
// });
//
// const clickImage = () => {
//   console.log('you clicked an image');
// };

export default HomePage;
