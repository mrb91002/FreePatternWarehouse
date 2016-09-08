import React from 'react';
import weakKey from 'weak-key';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const ProfilePage = React.createClass({

  render() {

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
        <h1>OhSewMuch - Profile</h1>
      </div>

       <div className="row pattern-space">
        <div className="container">
          <div className="col s12 pattern-artist">
            <div className="col s5 profile-main">
              <div className="col s8">
                <img src="https://market.ionic.io/img/user-default.png"/>
              </div>
              <div className="col s4">
                <p>Test User</p>
                <p>Website</p>
              </div>
            </div>
            <div className="col s7 profile-main">
              <div className="col s12">
                <div className="col s12 profile-about white">
                  <h1>About</h1>
                  <p>My name is Christine Benavides and the art of crafting, sewing and creating has always been among my favorite things to do. It is this passion that has brought me here today.  It all started when I was a little child and my mother showed me how to sew.  She started me off small, fixing a hem, repairing a button and eventualy adjusting a seam.  As I continued to practice I was filled with a sense of accomplishment and self empowerment that still drives me today.</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="container">

        <div className="col s4 space-20">
          <div className="col s12 pattern-square">
            <h5>My patterns</h5>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
          </div>
        </div>

        <div className="col s4 space-20">
          <div className="col s12 pattern-square">
            <h5>My favorites</h5>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
          </div>
        </div>

        <div className="col s4 space-20">
          <div className="col s12 pattern-square">
            <h5>My favorite artists</h5>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
            <div className="col s6">
              <img src="https://market.ionic.io/img/user-default.png"/>
            </div>
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

export default ProfilePage;








// import React from 'react';
// import weakKey from 'weak-key';
// import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';
//
//
// const ProfilePage = React.createClass({
//
//   render() {
//
//     return <div>
//       <div className="spacer"></div>
//
//       <div className="pattern-title col s8 offset-s2">
//         <h1>OhSewMuch - Profile</h1>
//       </div>
//
//        <div className="row pattern-space">
//         <div className="container">
//           <div className="col s12 pattern-artist">
//             <div className="col s5 red profile-main">
//               <div className="col s8 pink">
//                 <img src="https://market.ionic.io/img/user-default.png"/>
//               </div>
//               <div className="col s4 orange">
//                 <p>Test User</p>
//                 <p>Website</p>
//               </div>
//             </div>
//             <div className="col s7 green profile-main">
//               <div className="col s12 purple">
//                 <div className="col s12 profile-about white">
//                   <h1>About</h1>
//                   <p>My name is Christine Benavides and the art of crafting, sewing and creating has always been among my favorite things to do. It is this passion that has brought me here today.  It all started when I was a little child and my mother showed me how to sew.  She started me off small, fixing a hem, repairing a button and eventualy adjusting a seam.  As I continued to practice I was filled with a sense of accomplishment and self empowerment that still drives me today.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//
//
//
//
//
//         <div className="container  yellow">
//
//         <div className="col s4 space-20">
//           <div className="col s12">
//             <h5>My patterns</h5>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//           </div>
//         </div>
//
//         <div className="col s4 space-20">
//           <div className="col s12 white">
//             <h5>My patterns</h5>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//           </div>
//         </div>
//
//         <div className="col s4 space-20">
//           <div className="col s12 white">
//             <h5>My patterns</h5>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//             <div className="col s6">
//               <img src="https://market.ionic.io/img/user-default.png"/>
//             </div>
//           </div>
//         </div>
//
//         </div>
//
//
//
//
//       </div>
//     </div>
//   }
// });
//
// export default ProfilePage;





{/* <div className="col s9">
  <div className="col s4 pattern-artist">
    <div className="col s10 offset-s1">
      <img src={pattern.userImageUrl}/>
      <img src="https://market.ionic.io/img/user-default.png"/>
      <p>{pattern.userName}</p>
      <p>Test User</p>
      <p>Website</p>
    </div>
  </div>

  <div className="col s7 offset-s1 pattern-image-main">
    <img className="pattern-main" src={pattern.images[0].imageUrl} height="450px" alt={pattern.images[0].altText} />
    <img src="https://market.ionic.io/img/user-default.png" height="450px"/>

  </div>
</div>

<div className="col s3">
  <div className="col s10 offset-s1">


    <div className="image-tile">
      <img src="https://market.ionic.io/img/user-default.png"/>
      <p>Figure: 1</p>
    </div>

  </div>
</div> */}

















{/* <div className="col s9">
  <div className="col s4 pattern-artist">
    <div className="col s10 offset-s1">
      <img src={pattern.userImageUrl}/>
      <img src="https://market.ionic.io/img/user-default.png"/>
      <p>{pattern.userName}</p>
      <p>Test User</p>
      <p>Website</p>
    </div>
  </div>

  <div className="col s7 offset-s1 pattern-image-main">
    <img className="pattern-main" src={pattern.images[0].imageUrl} height="450px" alt={pattern.images[0].altText} />
    <img src="https://market.ionic.io/img/user-default.png" height="450px"/>

  </div>
</div>

<div className="col s3">
  <div className="col s10 offset-s1">


    <div className="image-tile">
      <img src="https://market.ionic.io/img/user-default.png"/>
      <p>Figure: 1</p>
    </div>

  </div>
</div> */}
