import Modal from 'react-modal';
import React from 'react';
import reactStringReplace from 'react-string-replace';
import { withRouter } from 'react-router';

let modalImage;
let modalImageNumber;
let pattern;

const PatternPage = React.createClass({
  getInitialState() {
    return { modalIsOpen: false };
  },

  componentDidMount() {
    $(window).scrollTop(0);
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
    // console.log('PATTERM PAGE');

    let imageNumber = 0;
    let materialNumber = 0;

    if (this.props.patterns.length === 0) {
      return <div />;
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

    // console.log(pattern);

    return <div>
      <div className="spacer" />

      <div className="pattern-title col s8 offset-s2">
        <h1>{pattern.patternName} - By:
          <span id={pattern.userName} onTouchTap={this.handleProfilePage}>
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

            <div className="col s7 offset-s1 pattern-image-main">
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
                {pattern.materials.map((material) => {
                  materialNumber += 1;

                  return <p key={material}>
                    <span className="bold">
                      {materialNumber}:
                    </span>
                    {` ${material}`}
                  </p>;
                })}
              </div>

              <h1 className="bold instructions">Instructions:</h1>
              {pattern.steps.map((step) => {
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
                    {newStep}
                  </p>
                </div>;
              })}
            </div>
          </div>

          <div className="col s3">
            <div className="col s10 offset-s1">

              {pattern.images.map((img) => {
                if (imageNumber === 0) {
                  imageNumber += 1;

                  return <div />;
                }
                imageNumber += 1;

                return <div
                  className="image-tile"
                  key={img}
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
