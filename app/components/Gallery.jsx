import Masonry from 'react-masonry-component';
import React from 'react';
import { withRouter } from 'react-router';

const masonryOptions = {
  transitionDuration: 0
};

const Gallery = React.createClass({

  handleTouchTap(event) {
    if (event.target.id) {
      return this.props.router.push(`/pattern/${event.target.id}`);
    }

    this.props.router.push(`/profile/${event.target.getAttribute('profile')}`);
  },
  handleProfilePage(event) {
    this.props.router.push(`/profile/${event.target.id}`);
  },

  handleLog() {
    // console.log('working');
  },

  render() {
    const shift = {
      marginLeft: '20px'
    };

    const patterns = this.props.patterns.rows;

    const childElements = patterns.map((pattern) => {
      return (
        <li
          className="image-element-class"
          id={pattern.id}
          key={pattern.id}
          style={shift}
        >
          <div className="home-tile" id={pattern.id}>
            <img
              alt={pattern.images[0][1]}
              className="pattern-image"
              id={pattern.id}
              src={pattern.images[0][0]}
            />
            <p id={pattern.id}>{pattern.patternName}</p>
            <img
              alt="default user image"
              className="user-image-small"
              profile={pattern.userName}
              src={pattern.userImageUrl}
            />
            <h1 profile={pattern.userName}>{pattern.userName}</h1>
          </div>
        </li>
      );
    });

    return (
      <Masonry
        className={'my-gallery-class'} // default ''
        disableImagesLoaded={false} // default false
        elementType={'ul'} // default 'div'
        onTouchTap={this.handleTouchTap}
        options={masonryOptions} // default {}
        updateOnEachImageLoad={false}
      >
        {childElements}
      </Masonry>
    );
  }
});

export default withRouter(Gallery);
