import React from 'react';
import PatternInSearch from 'components/PatternInSearch';
import weakKey from 'weak-key';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const PatternPage = React.createClass({

  render() {
    let imageNumber = 0;
    let stepNumber = 0;
    let materialNumber = 0;

    if (this.props.patterns.length === 0) {
      return <div></div>;
    }

    console.log(this.props.patterns.data.rows);

    const id = Number.parseInt(this.props.routeParams.id);

    const pattern = this.props.patterns.data.rows.filter((pat) => {
      return pat.id === id;
    })[0];

    console.log(pattern);


    return <div>
      <div className="spacer"></div>

      <div className="pattern-title col s8 offset-s2">
        <h1>{pattern.patternName} - By: {pattern.userName}</h1>
      </div>

      <div className="row pattern-space">
        {/* <div className="col s10 offset-s1"> */}
        <div className="container">

          <div className="col s9">
            <div className="col s4 pattern-artist">
              <div className="col s10 offset-s1">
                <img src={pattern.userImageUrl} />
                <p>{pattern.userName}</p>
                <p>Website</p>
              </div>
            </div>

            <div className="col s7 offset-s1 pattern-image-main">
              <img className="pattern-main" src={pattern.images[0]} height="305px" alt="TEMP HOLDER" />
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
                      stepNumber += 1;

                      return <div className="instruction-tile">
                        <p><span className="bold">Step {stepNumber}:</span> {step}</p>
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
                return <div className="image-tile">
                  <img src={img} alt="THIS IS A PLACEHOLDER" />
                   <p>figure: {imageNumber - 1}</p>
                </div>
              })}


            </div>
          </div>
        </div>
      </div>
    </div>
  }
});

export default PatternPage;
