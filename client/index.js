
import React from 'react';
import ReactDOM  from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, 
  NavLink
} from 'react-router-dom';


import App from './views/app';
import AppRouter from './routes'

/*const Wrapper = props => {
  console.log(props);
  return <App>{props.children}</App>
}*/

ReactDOM.render(
    <Router basename='/'>
      <App><AppRouter/></App>
    </Router>,
    document.getElementById('app')
  );
