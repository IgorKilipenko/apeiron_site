
import React from 'react';
import ReactDOM  from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, 
  NavLink
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import App from './views/app';
import AppRouter from './routes'

/*const Wrapper = props => {
  console.log(props);
  return <App>{props.children}</App>
}*/

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
    <Router basename='/'>
    <MuiThemeProvider theme={theme}>
      <App><AppRouter/></App>
      </MuiThemeProvider>
    </Router>,
    document.getElementById('app')
  );
