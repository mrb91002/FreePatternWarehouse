import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import UploadImage from 'components/UploadImage';
import { withRouter } from 'react-router';

const AddPattern = React.createClass({
  getInitialState() {
    return {
      uploadImages: [
        <UploadImage key="image" />,
        <img
          key="image"
          src="http://tutorials.knitpicks.com/wptutorials/wp-content/uploads/209/12/circular4.jpg"
        />,
        <img
          key="image"
          src="http://www.threadsmagazine.com/assets/uploads/posts/5152/SST1-knits-wovens-02.jpg"
        />
      ],
      materials: [],
      steps: [],
      title: ''
    };
  },

  componentDidMount() {
    $(window).scrollTop(0);
  },

  handleCancel() {
    this.props.router.push('/');
  },

  handleAddImage() {
    const nextImages = this.state.uploadImages.concat(<UploadImage />);

    this.setState({ uploadImages: nextImages });
  },

  handleAddMaterial() {
    const newMaterial = document.getElementById('material').value;
    const materialState = this.state.materials;

    if (newMaterial === '') {
      return;
    }

    if (newMaterial.length > 20) {
      // console.log('too long');
      // do something to notify the user
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
        return <div />;
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
        return <div />;
      }

      return step;
    });

    this.setState({ steps: nextSteps });
  },

  handleSubmit() {
    const uploadImages = [];
    let title = '';
    let materials;
    let steps = '';

    for (let i = 1; i < this.state.uploadImages.length; i++) {
      uploadImages.push(this.state.uploadImages[i].props.src);
    }

    if (title && uploadImages && materials && steps) {
      materials = this.state.materials;
      title = this.state.title;
      steps = this.state.steps;

      // console.log('win');
    }
  },

  handleUpdateTitle(event) {
    const nextTitle = event.target.value;

    this.setState({ title: nextTitle });
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
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
    };

    const stylex = {
      display: 'inline-block',
      color: 'rgb(173, 80, 87)',
      paddingRight: '10px',
      cursor: 'pointer'
    };

    const styleImage = {
      marginLeft: '20px',
      display: 'inline-block',
      cursor: 'pointer',
      width: '120px',
      border: '1px dashed grey'
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
              <div className="col s12">

                {this.state.uploadImages.map((image, index) => {
                  if (!image || image.length === 0) {
                    return <div />;
                  }

                  return <div key={index} style={styleImage}>
                    {image}
                  </div>;
                })}

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
                    onKeyUp={this.handleUpdateTitle}
                    underlineShow={false}
                  />
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
