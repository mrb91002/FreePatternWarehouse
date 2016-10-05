import Modal from 'react-modal';
import React from 'react';
import reactStringReplace from 'react-string-replace';
import FontIcon from 'material-ui/FontIcon';
import { withRouter } from 'react-router';
import axios from 'axios';

let modalImage;
let modalImageNumber;
let pattern;

let starColor;
let clicked;
let hoveredId;

const headers = { headers:
  { 'Content-Type': 'application/json', Accept: 'application/json' }
};

const PatternPage = React.createClass({
  getInitialState() {
    return {
      modalIsOpen: false,
      display: 'none'
      };
  },

  componentDidMount() {
    $(window).scrollTop(0);
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

  handleMouseEnter(event) {
    console.log(this.props.patterns.data.rows);
    const patterns = this.props.patterns.data.rows;

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

  // handleMouseLeave() {
  //   this.setState({ display: 'none'});
  // },

  handleMouseLeave() {
    console.log('mouse leave');
    const patterns = this.props.patterns.data.rows;
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

  handleOpenModal(event) {
    modalImageNumber = event.target.id;

    if (!modalImageNumber) {
      modalImageNumber = 'Main';
    }
    modalImage = event.target.getAttribute('src');
    this.setState({ modalIsOpen: true });
  },

  handleOpenModalInline(event) {
    modalImageNumber = event.target.id;

    modalImage = pattern.images[event.target.id][0];
    this.setState({ modalIsOpen: true });
  },

  handleAfterOpenModal() {
    // console.log('MODAL OPENED');
  },

  handleCloseModal() {
    this.setState({ modalIsOpen: false });
  },

  handleProfilePage(event) {
    this.props.router.push(`/profile/${event.target.id}`);
  },

  HandleCreateMarkup(string1) {
    return { __html: string1 };
  },

  render() {
    const shift = {
      marginLeft: '20px'
    };

    let imageNumber = 0;
    let materialNumber = 0;

    if (this.props.patterns.length === 0) {
      return <div />;
    }

    const patternPage = window.location.href.split('/').pop();

    let favoriteCheck = this.props.favorites.filter((fav) => {
      let checkFav;

      if (fav.patternId) {
        checkFav = fav.patternId;
      }else {
        checkFav = fav.id;
      }

        if (checkFav === parseInt(patternPage)) {
          return true;
        }

        return false;
      });
      if (favoriteCheck.length) {
        clicked = 'true';
        starColor = 'gold';
      }
      else {
        clicked = 'false';
        starColor = 'rgb(173, 80, 87)';
      }

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    // console.log(this.props.patterns.data.rows);

    const id = Number.parseInt(this.props.routeParams.id);

    pattern = this.props.patterns.data.rows.filter((pat) => {
      return pat.id === id;
    })[0];

    return <div>
      <div className="spacer" />

      <div className="pattern-title col s8 offset-s2">
        <h1>{pattern.patternName} - By:
          <span
            className="pointer"
            id={pattern.userName}
            onTouchTap={this.handleProfilePage}
          >
            {pattern.userName}
          </span>
        </h1>
      </div>

      <div className="row pattern-space">
        {/* <div className="col s10 offset-s1"> */}
        <div className="container">

          <div className="col s9">
            <div className="col s4 pattern-artist">
              <div className="col s10 offset-s1">
                <img
                  className="pointer"
                  id={pattern.userName}
                  onTouchTap={this.handleProfilePage}
                  src={pattern.userImageUrl}
                />
                <p
                  className="pointer"
                  id={pattern.userName}
                  onTouchTap={this.handleProfilePage}
                >
                  {pattern.userName}
                </p>
                <p className="pointer">
                  Website
                </p>
              </div>
            </div>

            <div
              className="image-element-class col s7 offset-s1 pattern-image-main"
              data-patternId={pattern.id}
              id={pattern.id}
              key={pattern.id}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              style={shift}
            >
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
                className="pattern-main pointer"
                height="305px"
                onTouchTap={this.handleOpenModal}
                src={pattern.images[0][0]}
              />
            </div>

            <div className="col s12 pattern-directions">
              <h1 className="bold materials">Materials:</h1>

              <div className="material-tile">
                {pattern.materials.map((material, materialKey) => {
                  materialNumber += 1;

                  let materialUrl = 'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=craft+'

                  materialUrl = materialUrl + material.replace(/\s+/g, '+');

                  return <p key={materialKey}>
                  {/* <a href={materialUrl} target="_blank"> */}
                    <span className="bold">
                      {materialNumber}:
                    </span>
                    {` ${material}`}
                    {/* </a> */}
                  </p>;

                })}
              </div>

              <h1 className="bold instructions">Instructions:</h1>
              {pattern.steps.map((step, stepIndex) => {
                const newStep = reactStringReplace(step,
                  /(figure:\s*\d+)/gi, (match, i) => {
                    const newNumber = Number.parseInt(
                      match.slice(match.indexOf(':') + 1)
                    );

                    return <span
                      id={newNumber}
                      key={i}
                      onTouchTap={this.handleOpenModalInline}
                      style={{ color: 'blue', cursor: 'pointer' }}
                    >
                      {match}
                    </span>;
                  });

                return <div className="instruction-tile" key={step}>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>
                      Step {stepIndex + 1}
                    </span>
                    : {newStep}
                  </p>
                </div>;
              })}
            </div>
          </div>

          <div className="col s3">
            <div className="col s10 offset-s1">

              {pattern.images.map((img, imgIndex) => {
                if (imageNumber === 0) {
                  imageNumber += 1;

                  return <div />;
                }
                imageNumber += 1;

                return <div
                  className="image-tile"
                  key={imgIndex}
                  onTouchTap={this.handleOpenModal}
                >
                  <img
                    alt={img[1]}
                    id={imageNumber - 1}
                    src={img[0]}
                  />
                  <p>figure: {imageNumber - 1}</p>
                </div>;
              })}

              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.handleAfterOpenModal}
                onRequestClose={this.handleCloseModal}
                style={customStyles}
              >
                <img
                  className="modal-image"
                  src={modalImage}
                />
                <p>Figure: {modalImageNumber}</p>
              </Modal>

            </div>
          </div>
        </div>
      </div>
    </div>;
  }
});

export default withRouter(PatternPage);
