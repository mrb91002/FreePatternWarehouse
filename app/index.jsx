import { blue500, blue700 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'components/Routes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',

  palette: {
    accent1Color: blue500,
    primary1Color: '#952727',
    primary2Color: '#F110EC'
  },

  flatButton: {
    buttonFilterColor: blue700,
    textColor: 'white'
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Routes />
  </MuiThemeProvider>,
  document.getElementById('app')
);
