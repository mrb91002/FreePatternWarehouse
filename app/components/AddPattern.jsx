import React from 'react';
import weakKey from 'weak-key';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router';
import UploadImage from 'components/UploadImage';

const AddPattern = React.createClass({
  getInitialState() {
    return {
      uploadImages: [
          <UploadImage/>,
          <UploadImage/>,
          <UploadImage/>,
          <UploadImage/>,
          <UploadImage/>,
          <UploadImage/>
      ],
    }
  },

  componentDidMount() {
    $(window).scrollTop(0);
  },

  handleCancel() {
      this.props.router.push('/');
    },

  handleAddImage() {
    const nextImages = this.state.uploadImages.concat(<UploadImage/>)

    this.setState({uploadImages: nextImages})
  },


  render() {
    console.log(this.state.uploadImages);
    const styleTextField = {
      backgroundColor: '#fff',
      borderRadius: '3px 3px 3px 3px',
      height: '10px',
      marginTop: '9px',
      border: 'none',
      padding: '10px',
      display: 'inline-block',
      boxShadow: '1px 1px 3px #c6cab9 inset'
    };

    const styleSearchButton = {
      backgroundColor: 'rgb(56, 93, 121)',
      height: '30px',
      lineHeight: '27px',
      border: 'none',
      borderRadius: '3px 3px 3px 3px',
      display: 'inline-block',
      marginLeft: "40px",
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
    };

    const styleActionButton = {
      backgroundColor: 'rgb(173, 80, 87)',
      height: '30px',
      lineHeight: '27px',
      border: 'none',
      borderRadius: '3px 3px 3px 3px',
      display: 'inline-block',
      margin: '40px 20px',
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
    };

    const styleActionDiv = {
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: 'blue'
    };

    const styleUpload = {
      // display:'inline-block',
    };

    const styleImage = {
      marginLeft: '20px',
      display: 'inline-block',
      cursor: 'pointer'
    }

    const styleAdd = {
      color: 'blue',
      cursor: 'pointer'
    }

    console.log('props');
    console.log(this.props);

    // if (!this.props.patterns) {
    //   return <div></div>;
    // }

    // const id = Number.parseInt(this.props.routeParams.id);
    //
    // const pattern = this.props.patterns.data.filter((pat) => {
    //   return pat.id === id;
    // })[0];

    return <div>
      <div className="spacer"></div>

      <div className="pattern-title col s8 offset-s2">
        <h1>Create a pattern</h1>
      </div>

      <div className="row pattern-space">
        <div className="container">
          <div className="col s12 upload-main">

            <div className="col s12">
              <p className="upload-title">Pattern Details</p>

              <div className="col s12">
                <div className="col s2">
                  <p className="right20">Title*</p>
                </div>
                <div className="col s10">
                  <TextField
                    inputStyle={styleTextField}
                    underlineShow={false}
                  />
                </div>
              </div>

              <div className="col s12">
                <div className="col s2">
                  <p className="right20">Steps*</p>
                </div>
                <div className="col s10">
                  <TextField
                    inputStyle={styleTextField}
                    underlineShow={false}
                  />

                  <FlatButton
                    label="Add"
                    style={styleSearchButton}
                  />

                </div>
              </div>

              <div className="col s12">
                <div className="col s2">
                  <p className="right20">Materials*</p>
                </div>
                <div className="col s10">
                  <TextField
                    inputStyle={styleTextField}
                    underlineShow={false}
                  />

                  <FlatButton
                    label="Add"
                    style={styleSearchButton}
                  />

                </div>
              </div>
            </div>

            <div className="col s12">
              <p className="upload-title">Photos</p>
              <p className="right20">Add at least one photo -
                <span
                  style={styleAdd}
                  onTouchTap={this.handleAddImage}
                >
                  Add Image
                </span>
              </p>
              <div className="col s12">

                {this.state.uploadImages.map((image) => {
                  return <div style={styleImage}>
                     {image}
                    </div>
                })}

               </div>
            </div>

            <div className="col s12 center">
              <FlatButton
                label="Submit"
                style={styleActionButton}
              />
              <FlatButton
                label="Cancel"
                style={styleActionButton}
                onTouchTap={this.handleCancel}
              />
            </div>

          </div>
        </div>

      </div>

      <footer>
        this is a footer
      </footer>
    </div>
  }
});

export default withRouter(AddPattern);
