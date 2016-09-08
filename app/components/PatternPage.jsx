import React from 'react';
import PatternInSearch from 'components/PatternInSearch';
import weakKey from 'weak-key';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const PatternPage = React.createClass({

  render() {

    if (this.props.patterns.length === 0) {
      return <div></div>;
    }

    const id = Number.parseInt(this.props.routeParams.id);

    const pattern = this.props.patterns.data.filter((pat) => {
      return pat.id === id;
    })[0];

    console.log(pattern);


    console.log(this.props.patterns.data);
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
              <img className="pattern-main" src={pattern.images[0].imageUrl} height="305px" alt={pattern.images[0].altText} />
            </div>




                <div className="col s12 pattern-directions">
                  <h1 className="bold materials">Materials:</h1>
                  <div className="instruction-tile">
                    <p>Step 1:  This is a sample step that is really long and needs to be put on multiple lines.  This is probably going to happen Quite a lot so we need to be prepaired for some really long explanations</p>
                  </div>

                  <h1 className="bold instructions">Instructions:</h1>


                  <div className="instruction-tile">
                    <p>Step 1:  This is a sample step that is really long and needs to be put on multiple lines.  This is probably going to happen Quite a lot so we need to be prepaired for some really long explanations</p>
                  </div>

                  <div className="instruction-tile">
                    <p>Step 2:  This is a sample step that is really long and needs to be put on multiple lines.  This is probably going to happen Quite a lot so we need to be prepaired for some really long explanations</p>
                  </div>

                  <div className="instruction-tile">
                    <p>Step 3:  This is a sample step that is really long and needs to be put on multiple lines.  This is probably going to happen Quite a lot so we need to be prepaired for some really long explanations</p>
                  </div>


                  <div className="instruction-tile">
                    <p>Step 4:  This is a sample step that is really long and needs to be put on multiple lines.  This is probably going to happen Quite a lot so we need to be prepaired for some really long explanations</p>
                  </div>
                </div>
          </div>

          <div className="col s3">
            <div className="col s10 offset-s1">



              {pattern.images.map((img) => {
                console.log(img);
                if (img.displayOrder === 1) {
                  return;
                }

                return <div className="image-tile">
                  <img src={img.imageUrl} alt={img.altText} />
                   <p>figure: {img.displayOrder -1}</p>
                </div>
              })}

              <div className="image-tile">
                <img src="https://market.ionic.io/img/user-default.png"/>
                <p>Figure: 1</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  }
});

export default PatternPage;
