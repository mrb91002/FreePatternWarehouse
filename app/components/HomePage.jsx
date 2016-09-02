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


      {patterns.map((pattern) => {
        if (pattern.displayOrder !== 1) {
          return;
        }
        return <PatternInSearch
          key={weakKey(pattern)}
          pattern={pattern}
        />
      })}

    </div>;
  }
});

export default HomePage;
