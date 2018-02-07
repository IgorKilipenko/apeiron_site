
import React from 'react';
import ReactDOM  from 'react-dom';

import App from './views/app';
import AppRouter from './routes'

/*const Wrapper = props => {
  console.log(props);
  return <App>{props.children}</App>
}*/

ReactDOM.render(
    <App><AppRouter/></App>,
    document.getElementById('app')
  );
