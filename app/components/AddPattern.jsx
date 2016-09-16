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
          <img src='http://tutorials.knitpicks.com/wptutorials/wp-content/uploads/2009/12/circular4.jpg'
          />,
          <img src='http://www.threadsmagazine.com/assets/uploads/posts/5152/SST1-knits-wovens-02.jpg'
          />
      ],
      materials: [],
      steps: [],
      title: ''
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

  handleAddStep() {
    console.log('adding step');
  },

  handleAddMaterial() {
    const newMaterial = document.getElementById('material').value;
    const materialState = this.state.materials;

    if (newMaterial === '') {
      return;
    }


    if (newMaterial.length > 20) {
      console.log('too long');
      // do something to notify the user
      return;
    }

    for (var i = 0; i < materialState.length; i++) {
      if (materialState[i] === newMaterial) {
        console.log('duplicate');
        return;
      }
    };

    const nextMaterial = this.state.materials.concat(`${newMaterial}`);

    document.getElementById('material').value = '';
    this.setState({materials: nextMaterial})
  },

  handleDeleteMaterial(event) {
    const remove = event.target.parentNode.previousSibling.innerHTML;

    let nextMaterials = this.state.materials.filter((material) => {
      if (material === remove) {
        return;
      }

      return material;
    });

    this.setState({materials: nextMaterials});
  },

  handleAddStep() {
    const newStep = document.getElementById('step').value;
    const stepState = this.state.steps;

    if (newStep === '') {
      return;
    }

    for (var i = 0; i < stepState.length; i++) {
      if (stepState[i] === newStep) {
        console.log('duplicate');
        return;
      }
    };

    const nextSteps = this.state.steps.concat(`${newStep}`);

    document.getElementById('step').value = '';
    this.setState({steps: nextSteps})
  },

  handleDeleteStep(event) {
    const remove = event.target.parentNode.previousSibling.innerHTML;
    console.log(remove);

    let nextSteps = this.state.steps.filter((step) => {
      if (step === remove) {
        return;
      }

      console.log('keep', step);
      return step;
    });

    this.setState({steps: nextSteps});
  },

  handleSubmit() {
    console.log('submit');

    // rip out need variables for the DB insert
    let uploadImages = [];
    for (var i = 1; i < this.state.uploadImages.length; i++) {
      uploadImages.push(this.state.uploadImages[i].props.src);
    }
    console.log(uploadImages);

    let title = '';
    if (this.state.title) {
      title=this.state.title;
      console.log(title);
    } else {
      console.log('nothing in title ERROR which shouldn\'t fire on initial load');
    }


    let materials = '';
    if (this.state.materials.length !== 0) {
      materials = this.state.materials;
      console.log(materials);
    } else {
      console.log('no materials yet');
    }

    let steps = '';
    if (this.state.steps.length !== 0) {
      steps = this.state.steps;
      console.log(steps);
    } else {
      console.log('no steps yet');
    }

    if (title && uploadImages && materials && steps) {
      console.log('win');
    }

  },

  handleUpdateTitle(event) {
    const nextTitle = event.target.value;
    console.log(nextTitle);
    this.setState({title: nextTitle})
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
      // height: '10px',
      // marginBottom: '19px',
      // width: '70%',
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
      marginLeft: "40px",
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
    };

    const styleAddButton2 = {
      backgroundColor: 'rgb(56, 93, 121)',
      height: '30px',
      lineHeight: '27px',
      border: 'none',
      borderRadius: '3px 3px 3px 3px',
      display: 'inline-block',
      marginLeft: "20px",
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



    const styleActionDiv = {
      marginLeft: 'auto',
      marginRight: 'auto',
    };

    const styleUpload = {
      // display:'inline-block',
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
      return <div></div>;
    }

    return <div>
      <div className="spacer"></div>

      <div className="pattern-title col s8 offset-s2">
        <h1>Create a pattern</h1>
      </div>

      <div className="row pattern-space">
        <div className="container">
          <div className="col s12 upload-main">

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
              {this.state.uploadImages.map((image, index) => {
                if (!image || image.length === 0) {
                  console.log('huh?');
                  return <div></div>
                }
                return <div
                    style={styleImage}
                    key={index}
                  >
                    {image}
                  </div>
              })}

             </div>
          </div>


          {/* Start */}


            <div className="col s12">
              <p className="upload-title down40">Pattern Details</p>

              <div className="col s12">
                <div className="col s2">
                  <p className="right20">Title*</p>
                </div>
                <div className="col s10">
                  <TextField
                    inputStyle={styleTextField}
                    underlineShow={false}
                    id="title"
                    onKeyUp={this.handleUpdateTitle}
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
                    id="material"
                  />

                  <FlatButton
                    label="Add"
                    style={styleAddButton}
                    onTouchTap={this.handleAddMaterial}
                  />
                </div>

                <div className="col s10 offset-s2">

                  {this.state.materials.map((material, index) => {
                    return <div
                        style={styleMaterial}
                        key={index}
                      >
                      <p className="inline">{material}</p>
                      <div className="delete-div">
                        <p
                          style={stylex}
                          onTouchTap={this.handleDeleteMaterial}
                        >
                          x
                        </p>
                      </div>
                    </div>
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
                    inputStyle={styleTextFieldMulti}
                    underlineShow={false}
                    multiLine={true}
                    fullWidth={true}
                    id="step"
                    />
                  </div>

                  <div style={styleAddButton2Div}>
                    <FlatButton
                      label="Add"
                      style={styleAddButton2}
                      onTouchTap={this.handleAddStep}
                    />
                  </div>
                </div>
              </div>


              <div className="col s10 offset-s2">


              {this.state.steps.map((step, index) => {
                return <div style={styleMaterial}
                key={index}
                >
                  <p className="inline">{step}</p>
                  <div className="delete-div">
                    <p
                      style={stylex}
                      onTouchTap={this.handleDeleteStep}
                    >
                      x
                    </p>
                  </div>
                  </div>
              })}

              </div>

            </div>




            <div className="col s12 center">
              <FlatButton
                label="Submit"
                style={styleActionButton}
                onTouchTap={this.handleSubmit}
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


// create clickable word that creates a modal
