import React from 'react';
import Masonry from 'react-masonry-component';
import { withRouter } from 'react-router';


var masonryOptions = {
    transitionDuration: 0
};

var Gallery = React.createClass({

  handleTouchTap(event) {
    this.props.router.push(`/product/${this.props.product.id}`)
  },

    render: function () {
      const shift = {
        marginLeft: '20px'
      };

      console.log(this.props.patterns);
      let patterns  = this.props.patterns;

        var childElements = patterns.map(function(pattern){
           return (
                <li className="image-element-class" style={shift}>
                  <div className="home-tile">
                    <img src={pattern.images[0].imageUrl}
                      alt={pattern.images[0].altText}
                      id={pattern.id}
                      className="pattern-image"
                      // onclick="myFunction(event)"
                      // handleTouchTap={this.handleTouchTap}
                    />
                    <p>{pattern.patternName}</p>
                    <img src={pattern.userImageUrl} alt="default user image" className="user-image-small"/>
                    <h1>{pattern.userName}</h1>
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
            >
                {childElements}
            </Masonry>
        );
    }
});

export default withRouter(Gallery);
