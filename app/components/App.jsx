import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import cookie from 'react-cookie';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
// import {Navbar, NavItem} from 'react-materialize';
// import {Grid, Row, Col} from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';



const App = React.createClass({
  getInitialState() {
    return {
      patterns: [],
    }
  },

  componentWillMount() {
    // Get the patterns from the API
    console.log('componentWillMount');
    axios.get('/api/patterns')
      .then((patterns) => {
        console.log('data ');
        this.setState({ patterns: patterns });
        this.forceUpdate();
      })
      .catch((err) => {
        console.error(err.response || err);
      });
  },

  handleTitleTouchTap() {
      this.props.router.push('/');
    },

  handleTouchTapLogin() {
    this.props.router.push('/login');
  },

  getChildrenProps() {
    const matchPath = this.props.routes.reduce((accum, route) => {
      // Sometimes route.path is undefined, so default to empty string
      return `${accum}${route.path || ''}`;
    }, '');

    const props = {
      '/': {
        patterns: this.state.patterns
      }
    };

    return props[matchPath];
  },

  render() {

    const styleFlatButton = {
      height: '64px',
      lineHeight: '64px'
    };

    const styleNavInput = {
      borderRadius: '3px 0 0 3px',
      height: '29px',
      marginTop: '20px',
      border: 'none',
      padding: '9px',
      width: '50%'

      // backgroundColor: '#fff',
      // borderRadius: '3px 0 0 3px',
      // height: '15px',
      // marginTop: '13px',
      // border: 'none',
      // display:'inline-block',
      // padding: '9px',
      // width: 70%;
    };

    const styleAppBar = {
      backgroundColor: '#385D79',
      position: "fixed",
      // boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px;'
    };

    const styleInputContainer = {
    };

    const styleSearchButton = {
      backgroundColor: '#AD5057',
      height: '30px',
      lineHeight: '27px',
      border: 'none',
      borderRadius: '0 3px 3px 0',
      display: 'inline-block',
      marginTop: '18px'
    };

    const styleTextField = {
      backgroundColor: '#fff',
      borderRadius: '3px 0 0 3px',
      height: '10px',
      marginTop: '18px',
      border: 'none',
      padding: '10px',
      display: 'inline-block',
    };

    const styleTitle = {
      cursor: 'pointer'
    };


    console.log(this.state.patterns);
    return <div>
        <AppBar
          zDepth='2'
          iconElementLeft={<IconButton></IconButton>}
          title="Free Pattern Warehouse"
          titleStyle={styleTitle}
          style={styleAppBar}
          onTitleTouchTap={this.handleTitleTouchTap}
        >
        {/* <div style={styleInputContainer}> */}
          {/* <input style={styleNavInput} /> */}

          <TextField
            inputStyle={styleTextField}
            underlineShow={false}
          />
          <FlatButton
            label="Search"
            style={styleSearchButton}
          />
        {/* </div> */}


        <FlatButton
          label="Login"
          style={styleFlatButton}
          onTouchTap={this.handleTouchTapLogin}
        />
        <FlatButton
          label="Register"
          style={styleFlatButton}
        />
        </AppBar>




      {/* React.cloneElement is the glue that passes in props to children created with React Router. React router instantiates classes for us, and cloning the existing instance is the only way to set props.
      */}
      {React.cloneElement(this.props.children, this.getChildrenProps())}
    </div>
  }
});

export default withRouter(App);


{/*
        <AppBar
          onTitleTouchTap={this.handleTitleTouchTap}
          title="Oh Sew Much"
          titleStyle={styleTitle}
          style={styleNav}
          zDepth={2}
        >
          <FlatButton
            label="Login"
            onTouchTap={this.handleTouchTapLogin}
            style={Object.assign({}, styleFlatButton, showLogin())}
          />
          <FlatButton
            label="Register"
            onTouchTap={this.handleTouchTapReg}
            style={Object.assign({}, styleFlatButton, showRegister())}
          />
          <FlatButton
            label="Logout"
            onTouchTap={this.handleTouchTapLogout}
            style={Object.assign({}, styleFlatButton, showLogout())}
          />
          <FlatButton
            label="Admin"
            onTouchTap={this.handleTouchTapAdmin}
            style={Object.assign({}, styleFlatButton, showAdmin())}
          />
          <FlatButton
            label={"Cart - " + quantity}
            onTouchTap={this.handleTouchTapCart}
            style={Object.assign({}, styleFlatButton, showCart())}
          />
          <FlatButton
            label="Empty Cart"
            onTouchTap={this.handleTouchTapEmptyCart}
            style={Object.assign({}, styleFlatButton, showEmptyCart())}
          />
        </AppBar> */}




// make sure that materialzie is coming in properly... doesn't appear to be.
// Afterwards make sure columns are working... try to get materialize stock
// navbar... cause it's better. col s? is not doing anything...
