import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import UploadImage from 'components/UploadImage';
import axios from 'axios';
import { withRouter } from 'react-router';
import cloudinary from 'cloudinary';
import Dropzone from 'react-dropzone';

const AddPattern = React.createClass({
  getInitialState() {
    return {
      uploadImages: [],
      materials: [],
      steps: [],
      title: '',
      titleRemaining: 21
    };
  },

  componentDidMount() {
    $(window).scrollTop(0);
  },

    onDrop(files) {
      const form = new FormData();

      form.append('file', files[0])
      form.append('upload_preset', 'FPW_TEST')

      const url = 'https://api.cloudinary.com/v1_1/freepatternwarehouse/image/upload';
      axios.post(url, form)
      .then((cloudinaryRes) => {
          console.log('this is the cloudinary response', cloudinaryRes);

          const newImage = { imageUrl: cloudinaryRes.data.secure_url, altText: 'test' }
          const updatedImages = this.state.uploadImages.concat(newImage)
          this.setState({ uploadImages: updatedImages });

        })
        .catch((err) => {
          console.error(err);
        });

    },

  handleCancel() {
    this.props.router.push('/');
  },

  handleAddImage() {
    const nextImages = this.state.uploadImages.concat({ img: <UploadImage /> });

    this.setState({ uploadImages: nextImages });
  },

  handleAddMaterial() {
    const newMaterial = document.getElementById('material').value;
    const materialState = this.state.materials;

    if (newMaterial === '') {
      return;
    }

    for (let i = 0; i < materialState.length; i++) {
      if (materialState[i] === newMaterial) {
        return;
      }
    }

    const nextMaterial = this.state.materials.concat(`${newMaterial}`);

    document.getElementById('material').value = '';
    this.setState({ materials: nextMaterial });
  },

  handleDeleteMaterial(event) {
    const remove = event.target.parentNode.previousSibling.innerHTML;

    const nextMaterials = this.state.materials.filter((material) => {
      if (material === remove) {
        return false;
      }

      return material;
    });

    this.setState({ materials: nextMaterials });
  },

  handleAddStep() {
    const newStep = document.getElementById('step').value;
    const stepState = this.state.steps;

    if (newStep === '') {
      return;
    }

    for (let i = 0; i < stepState.length; i++) {
      if (stepState[i] === newStep) {
        return;
      }
    }

    const nextSteps = this.state.steps.concat(`${newStep}`);

    document.getElementById('step').value = '';
    this.setState({ steps: nextSteps });
  },

  handleDeleteStep(event) {
    const remove = event.target.parentNode.previousSibling.innerHTML;

    const nextSteps = this.state.steps.filter((step) => {
      if (step === remove) {
        return false;
      }

      return step;
    });

    this.setState({ steps: nextSteps });
  },

  handleSubmit() {
    const config = {
      headers: {
        'Content-Type': 'application/json', Accept: 'application/json'
      }
    };

    const insertImages = this.state.uploadImages;
    const insertTitle = this.state.title;
    const insertMaterials = this.state.materials;
    const insertSteps = this.state.steps;
    let newPatternId;

    if (insertTitle && insertImages && insertMaterials && insertSteps) {
      const insertNewPattern = {
        patternName: insertTitle,
        steps: insertSteps,
        imageUrls: insertImages,
        materials: insertMaterials
      };

      axios.post('/api/patterns', insertNewPattern, config)
        .then((pattern) => {
          this.props.addPattern(pattern);
          newPatternId = pattern.data.id;
          this.props.router.push(`/pattern/${newPatternId}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    else {
      console.log('something that was needed was not set');

      return;
    }
  },

  handleUpdateTitle(event) {
    const toTitleCase = (str) => {
      return str.replace(/\w\S*/g, (txt) => {
        return txt[0].toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

    const nextTitle = toTitleCase(event.target.value);
    const newTitleRemaining = 21 - event.target.value.length;

    event.target.value = nextTitle;

    if (event.target.value.length >= 22) {
      event.target.value = event.target.value.substring(0, 21);

      return;
    }

    this.setState({ title: nextTitle, titleRemaining: newTitleRemaining });
  },

  render() {
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

    const styleTextFieldMulti = {
      backgroundColor: '#fff',
      borderRadius: '3px 3px 3px 3px',
      border: 'none',
      paddingLeft: '10px',
      display: 'inline-block',
      boxShadow: '1px 1px 3px #c6cab9 inset'
    };

    const styleTextFieldMultiDiv = {
      width: '70%',
      display: 'inline-block'
    };

    const styleAddButton = {
      backgroundColor: 'rgb(56, 93, 121)',
      height: '30px',
      lineHeight: '27px',
      border: 'none',
      borderRadius: '3px 3px 3px 3px',
      display: 'inline-block',
      marginLeft: '40px',
      // eslint-disable-next-line
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
    };

    const styleAddButton2 = {
      backgroundColor: 'rgb(56, 93, 121)',
      height: '30px',
      lineHeight: '27px',
      border: 'none',
      borderRadius: '3px 3px 3px 3px',
      display: 'inline-block',
      marginLeft: '20px',
      // eslint-disable-next-line
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
    };

    const styleAddButton2Div = {
      display: 'inline-block'
    };

    const styleActionButton = {
      backgroundColor: 'rgb(173, 80, 87)',
      height: '30px',
      lineHeight: '27px',
      border: 'none',
      borderRadius: '3px 3px 3px 3px',
      display: 'inline-block',
      margin: '40px 20px',
      // eslint-disable-next-line
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
    };

    const stylex = {
      display: 'inline-block',
      color: 'rgb(173, 80, 87)',
      paddingRight: '10px',
      cursor: 'pointer'
    };

    const styleImage = {
      // marginLeft: '20px',
      display: 'inline-block',
      cursor: 'pointer',
      // width: '120px',
      borderRadius: '5px 5px 0 0'
      // border: '1px dashed grey'
    };

    const styleAdd = {
      color: 'blue',
      cursor: 'pointer'
    };

    const styleMaterial = {
      borderRadius: '5px',
      display: 'inline-block',
      marginTop: '10px',
      marginBottom: '22px',
      marginLeft: '10px',
      paddingLeft: '10px',
      // eslint-disable-next-line
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
    };

    if (!this.props.patterns || this.props.patterns.length === 0) {
      return <div />;
    }

    return <div>
      <div className="spacer" />
      <div className="pattern-title col s8 offset-s2">
        <h1>Create a pattern</h1>
      </div>
      <div className="row pattern-space">
        <div className="container">
          <div className="col s12 upload-main">
            <div className="col s12">
              <p className="upload-title">Photos</p>
              <p className="right20">Add at least one photo -
                <span onTouchTap={this.handleAddImage} style={styleAdd}>
                Add Image
                </span>
              </p>

              <div className="col s2">

                <Dropzone
                  style = {{
                    height: '150px',
                    width: '150px',
                    padding: '10px',
                    border:'2px dashed rgb(102, 102, 102)',
                    borderRadius: '5px',
                    display: 'inline-block',
                    marginLeft: '20px'
                  }}
                  onDrop={this.onDrop}
                  // accept="image/*"
                >
                  <div>Try dropping some files here, or click to select files to upload.
                  </div>
                  {/* <img src={file[0].preview} /> */}
                </Dropzone>
              </div>

              <div className="col s9 offset-s1">

                {this.state.uploadImages.map((image, index) => {
                  if (!image || image.length === 0) {
                    return <div />;
                  }

                  return <div style={{ display: 'inline-block' }}>
                    <div style={{
                      display: 'inline-block',
                      width: '145px',
                      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
                      borderRadius: '5px',
                      marginBottom: '17px',
                      marginLeft: '20px',
                      cursor: 'pointer'
                      }}>
                      <img
                        alt={image.altText}
                        key={index}
                        src={image.imageUrl}
                        style={styleImage}
                      />
                      <p className = "center">
                        Figure: {index + 1}
                      </p>
                    </div>
                  </div>
                })}

{/*  make sure that only images are being uploaded */}

              </div>
            </div>
            <div className="col s12">
              <p className="upload-title down40">Pattern Details</p>
              <div className="col s12">
                <div className="col s2">
                  <p className="right20">Title*</p>
                </div>
                <div className="col s10">
                  <TextField
                    id="title"
                    inputStyle={styleTextField}
                    onChange={this.handleUpdateTitle}
                    underlineShow={false}
                  />
                  <p style={{ display: 'inline-block', marginLeft: '25px' }}>
                    {this.state.titleRemaining}
                  </p>
                </div>
              </div>
              <div className="col s12">
                <div className="col s2">
                  <p className="right20">Materials*</p>
                </div>
                <div className="col s10">
                  <TextField
                    id="material"
                    inputStyle={styleTextField}
                    underlineShow={false}
                  />
                  <FlatButton
                    label="Add"
                    onTouchTap={this.handleAddMaterial}
                    style={styleAddButton}
                  />
                </div>
                <div className="col s10 offset-s2">

                  {this.state.materials.map((material, index) => {
                    return <div key={index} style={styleMaterial}>
                      <p className="inline">{material}</p>
                      <div className="delete-div">
                        <p
                          onTouchTap={this.handleDeleteMaterial}
                          style={stylex}
                        >
                          x
                        </p>
                      </div>
                    </div>;
                  })}

                </div>
              </div>
              <div className="col s12">
                <div className="col s2">
                  <p className="right20">Pattern Steps*</p>
                </div>
                <div className="col s10">
                  <div style={styleTextFieldMultiDiv}>
                    <TextField
                      fullWidth={true}
                      id="step"
                      inputStyle={styleTextFieldMulti}
                      multiLine={true}
                      underlineShow={false}
                    />
                  </div>
                  <div style={styleAddButton2Div}>
                    <FlatButton
                      label="Add"
                      onTouchTap={this.handleAddStep}
                      style={styleAddButton2}
                    />
                  </div>
                </div>
              </div>
              <div className="col s10 offset-s2">

              {this.state.steps.map((step, index) => {
                return <div key={index} style={styleMaterial}>
                  <p className="inline">{step}</p>
                  <div className="delete-div">
                    <p onTouchTap={this.handleDeleteStep} style={stylex}>
                      x
                    </p>
                  </div>
                </div>;
              })}

              </div>
            </div>
            {/* <div
                  className="g-recaptcha"
                  data-sitekey="6LczYAcUAAAAADnrynsB9YkpUrlF6CJvz8y6jQ2Q">
                </div> */}
            <div className="col s12 center">
              <FlatButton
                label="Submit"
                onTouchTap={this.handleSubmit}
                style={styleActionButton}
              />
              <FlatButton
                label="Cancel"
                onTouchTap={this.handleCancel}
                style={styleActionButton}
              />
            </div>
          </div>
        </div>
      </div>
      <footer>
        this is a footer
      </footer>
    </div>;
  }
});

export default withRouter(AddPattern);
