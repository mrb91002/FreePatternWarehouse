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
    // console.log('componentWillMount');
    axios.get('/api/patterns2')
      .then((patterns) => {
        // console.log('data ');
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

  handleTouchTapUpload() {
    this.props.router.push('/add-pattern');
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

    props['/pattern/:id'] = props['/'];
    props['/add-pattern'] = props['/'];
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
    };

    const styleAppBar = {
      backgroundColor: '#385D79',
      position: "fixed",
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
      boxShadow: '1px 1px 3px #c6cab9 inset',
    };

    const styleTitle = {
      cursor: 'pointer'
    };


    // console.log(this.state.patterns);
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
          label="Upload"
          style={styleFlatButton}
          onTouchTap={this.handleTouchTapUpload}
        />
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
