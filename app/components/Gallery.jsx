import axios from 'axios';
import Masonry from 'react-masonry-component';
import React from 'react';
import { withRouter } from 'react-router';
import FontIcon from 'material-ui/FontIcon';

const masonryOptions = {
  transitionDuration: 0
};

const headers = { headers:
  { 'Content-Type': 'application/json', Accept: 'application/json' }
};

let hoveredId;

const Gallery = React.createClass({

  handleMouseEnter(event) {
    const patterns = this.props.patterns.rows;

     hoveredId = event.currentTarget.id;

    const updatedState = patterns.map((pattern) =>
    {
      if (parseInt(pattern.id) === parseInt(hoveredId)) {
        pattern.display = 'block';
      }

      return pattern;
    });
    console.log('galler.jsx hover', updatedState);
    // call state mutator to update the app.jsx state
    // this.setState({ hoveredStateLocation: updatedState });
    this.props.handlePatternHover(updatedState)
  },

  handleMouseLeave() {
    console.log('mouse leave');
    const patterns = this.props.patterns.rows;
    const updatedState = patterns.map((pattern) =>
    {
      if (parseInt(pattern.id) === parseInt(hoveredId)) {
        pattern.display = 'none';
      }

      return pattern;
    });
    //

    this.props.handlePatternHover(updatedState)
  },

  handleClickStar(event) {
    // if not logged in send user to login page
    if (!this.props.cookies.loggedIn) {
      return this.props.router.push('/login');
    }

    // changed event.traget to event.current target
    // and removed the .parentElement
    console.log('event.target', event.target);
    console.log('event.currentTarget', event.currentTarget.getAttribute('data-clicked'));
    const fav = event.currentTarget.getAttribute('data-patternId');
    const eventTarget = event.currentTarget;

    if (event.currentTarget.getAttribute('data-clicked') === 'false') {
      // if not logged in send user to login page
      if (!this.props.cookies.loggedIn) {
        return this.props.router.push('/login');
      }
      // Add favorite
      axios.post('/api/favorites', { patternId: fav }, headers)
        .then((favorite) => {
          Materialize.toast('Favorite Added', 2000, 'rounded');
          favorite.data.display = 'none';

          this.props.addFavorite(favorite.data);
        })
        .catch((err) => {
          Materialize.toast('An Error has occured, please send us an email', 2000, 'rounded');
        });
    }
    else {
      // Delete favorite
      axios.delete(`/api/favorites/${fav}`, headers)
        .then((deleted) => {
          console.log('deleted', deleted.data);
          Materialize.toast('Favorite Removed', 2000, 'rounded');
          this.props.removeFavorite(deleted.data);
        })
        .catch((err) => {
          console.log('hard fail', err)
        });
    }
  },

  handlePatternClick(event) {
    this.props.router.push(`/pattern/${event.target.id}`);
  },

  handleProfileClick(event) {
    const profileName = event.target.getAttribute('name');
    this.props.router.push(`/profile/${profileName}`)
  },

  render() {
    const shift = {
      marginLeft: '20px'
    };

    const patterns = this.props.patterns.rows;

    const childElements = patterns.map((pattern) => {
      if (!pattern.display) {
        pattern.display = 'none'
      }
      // console.log('Current Favorites', this.props.favorites);
      let clicked;
      let starColor;
      // check each pattern against the logged in user's favorites
      const favoriteCheck =
        this.props.favorites.filter((favorite) => {
        if (favorite.patternName === pattern.patternName) {
          return true
        }
        else {
          return false
        }
      });

      if (favoriteCheck.length) {
        clicked = 'true';
        starColor = 'gold';
      }
      else {
        clicked = 'false';
        starColor = 'rgb(173, 80, 87)';
      }

      return (
        <li
          className="image-element-class"
          data-patternId={pattern.id}
          id={pattern.id}
          key={pattern.id}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={shift}
        >
          <div className="home-tile" id={pattern.id}>

            {/*  star popup */}
            <div
              data-clicked={clicked}
              data-patternId={pattern.id}
              onTouchTap={this.handleClickStar}
              style={{
                display: `${pattern.display}`,
                backgroundColor: '#fff',
                position: 'absolute',
                marginTop: '20px',
                marginLeft: '20px',
                borderRadius: '5px',
                padding: '5px 5px 2px 5px',
                boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
                cursor: 'pointer'
            }}>
              <FontIcon
                className="material-icons"
                data-clicked={clicked}
                data-patternId={pattern.id}
                style={{ color: starColor, fontSize: '35px' }}
              >
                stars
              </FontIcon>
            </div>

            <img
              alt={pattern.images[0][1]}
              className="pattern-image"
              id={pattern.id}
              src={pattern.images[0][0]}
              onTouchTap={this.handlePatternClick}
            />
            <p
              id={pattern.id}
              onTouchTap={this.handlePatternClick}
            >
                {pattern.patternName}
            </p>

            <img
              alt="default user image"
              className="user-image-small"
              name={pattern.userName}
              src={pattern.userImageUrl}
              onTouchTap={this.handleProfileClick}
            />
            <h1 name={pattern.userName} onTouchTap={this.handleProfileClick}>
              {pattern.userName}
            </h1>
          </div>
        </li>
      );
    });

    return (
      <Masonry
        className={'my-gallery-class'} // default ''
        disableImagesLoaded={false} // default false
        elementType={'ul'} // default 'div'
        options={masonryOptions} // default {}
        updateOnEachImageLoad={false}
      >
        {childElements}
      </Masonry>
    );
  }
});

export default withRouter(Gallery);
