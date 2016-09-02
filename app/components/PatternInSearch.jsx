import React from 'react';
// import ProductInGrid from 'components/ProductInGrid';
// import weakKey from 'weak-key';

const PatternInSearch = React.createClass({
  // contextTypes: {
  //   muiTheme: React.PropTypes.object.isRequired
  // },
  //
  // componentDidMount() {
  //   $('.parallax').parallax();
  // },

  render() {
    const pattern = this.props.pattern

    return <div>
      <img src={pattern.imageUrl} alt={pattern.altText} />
      {pattern.patternName}
      {pattern.userName}
      {pattern.id}
    </div>;
  }
});

export default PatternInSearch;
