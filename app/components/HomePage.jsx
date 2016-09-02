import React from 'react';
import PatternInSearch from 'components/PatternInSearch';
import weakKey from 'weak-key';

const HomePage = React.createClass({
  // contextTypes: {
  //   muiTheme: React.PropTypes.object.isRequired
  // },

  render() {
    let patterns  = this.props.patterns.data;

    if (!patterns) {
      return <p>failed</p>
    }

    console.log('render home page');
    console.log(patterns);

    return <div>
      <p>home page is working</p>

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
