import React from 'react';
import PatternInSearch from 'components/PatternInSearch';
import weakKey from 'weak-key';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import reactStringReplace from 'react-string-replace';

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

  openModal(event) {
    console.log('event opening');
      console.log(event.target);
      modalImageNumber = event.target.id;

      if (!modalImageNumber) {
        modalImageNumber = 'Main'
      }
      modalImage = event.target.getAttribute('src');
      this.setState({modalIsOpen: true});
  },

  openModalInline(event) {
      modalImageNumber = event.target.id;

      modalImage = pattern.images[event.target.id][0];
      this.setState({modalIsOpen: true});
  },

  afterOpenModal() {
    console.log('MODAL OPENED');
      // references are now sync'd and can be accessed.
      // this.refs.subtitle.style.color = '#f00';
  },

  closeModal() {
   this.setState({modalIsOpen: false});
  },

  handleProfilePage(event) {
    this.props.router.push(`/profile/${event.target.id}`);
  },

  createMarkup(string1) {
    return {__html: string1};
  },

  handleLog() {
    console.log('clicked');
  },

  render() {
    console.log('PATTERM PAGE');

    let imageNumber = 0;
    let stepNumber = 0;
    let materialNumber = 0;


    if (this.props.patterns.length === 0) {
      return <div></div>;
    }


    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    console.log(this.props.patterns.data.rows);

    const id = Number.parseInt(this.props.routeParams.id);

    pattern = this.props.patterns.data.rows.filter((pat) => {
      return pat.id === id;
    })[0];

    console.log(pattern);


    return <div>
      <div className="spacer"></div>

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
                <img src={pattern.userImageUrl}
                  className="pointer"
                />
                <p id={pattern.userName}
                  onTouchTap={this.handleProfilePage}
                  className="pointer"
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
                className="pattern-main pointer"
                src={pattern.images[0][0]}
                height="305px"
                onTouchTap={this.openModal}
                alt={pattern.images[0][1]}
              />
            </div>



                <div className="col s12 pattern-directions">
                  <h1 className="bold materials">Materials:</h1>

                  <div className="instruction-tile">
                    {pattern.materials.map((material) => {
                      materialNumber += 1;
                      return <p><span className="bold">{materialNumber}:</span> {material}</p>
                    })}

                  </div>

                  <h1 className="bold instructions">Instructions:</h1>
                    {pattern.steps.map((step) => {



          let newStep = reactStringReplace(step, /(figure:\s*\d+)/gi, (match, i) => {

            const newNumber =
             Number.parseInt(match.slice(match.indexOf(':')+1));
            console.log(newNumber);

            return <span
              id={newNumber}
              key={i}
              style={{ color: 'blue', cursor: 'pointer' }}
              onTouchTap={this.openModalInline}
            >{match}</span>;
          });



                      // const newStep = <p>{step}</p>;


                      return <div className="instruction-tile">
                        <p>
                        {newStep}
                        </p>
                      </div>
                    })}
                </div>
          </div>

          <div className="col s3">
            <div className="col s10 offset-s1">



              {pattern.images.map((img) => {
                if (imageNumber === 0) {
                  imageNumber += 1;
                  return;
                }
                imageNumber += 1;
                return <div
                  onTouchTap={this.openModal}
                  className="image-tile"
                >
                  <img
                    id={imageNumber - 1}
                    src={img[0]}
                    alt={img[1]}
                  />
                   <p>figure: {imageNumber - 1}</p>
                </div>
              })}

              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
              >
                <img
                  src={modalImage}
                  className="modal-image"
                 />
                 <p>Figure: {modalImageNumber}</p>
              </Modal>


            </div>
          </div>
        </div>
      </div>
    </div>
  }
});

export default withRouter(PatternPage);
