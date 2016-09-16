import React from 'react';
import Masonry from 'react-masonry-component';
import { withRouter } from 'react-router';


var masonryOptions = {
    transitionDuration: 0
};

var Gallery = React.createClass({

  handleTouchTap(event) {
    if (event.target.id) {
        return this.props.router.push(`/pattern/${event.target.id}`);
    }

    this.props.router.push(`/profile/${event.target.getAttribute('profile')}`)
  },
  handleProfilePage(event) {
    this.props.router.push(`/profile/${event.target.id}`);
  },

  handleLog() {
    console.log('working');
  },

    render() {

      const shift = {
        marginLeft: '20px'
      };

      console.log(this.props.patterns.rows);
      let patterns  = this.props.patterns.rows;

        var childElements = patterns.map(function(pattern){
           return (
                <li
                  id={pattern.id}
                  className="image-element-class"
                  style={shift}
                  key={pattern.id}
                >
                  <div id={pattern.id} className="home-tile"
                >
                    <img src={pattern.images[0][0]}
                      alt={pattern.images[0][1]}
                      id={pattern.id}
                      className="pattern-image"
                    />
                    <p id={pattern.id}>{pattern.patternName}</p>
                    <img
                      profile={pattern.userName}
                      src={pattern.userImageUrl}
                      alt="default user image"
                      className="user-image-small"/>
                    <h1  profile={pattern.userName}>{pattern.userName}</h1>
                  </div>
                </li>
            );
        });

        return (
            <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                onTouchTap={this.handleTouchTap}
            >
                {childElements}
            </Masonry>
        );
    }
});

export default withRouter(Gallery);
