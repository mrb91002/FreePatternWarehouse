import React from 'react';
import PatternInSearch from 'components/PatternInSearch';
import weakKey from 'weak-key';


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
