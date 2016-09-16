import React from 'react';

const PatternInSearch = React.createClass({

  render() {
    const pattern = this.props.pattern;

    return <div>
      <img
        alt={pattern.altText}
        id={pattern.id}
        src={pattern.imageUrl}
      />
      {pattern.patternName}
      {pattern.userName}
      {pattern.id}
    </div>;
  }
});

export default PatternInSearch;
