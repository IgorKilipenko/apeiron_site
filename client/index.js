
import React from 'react';
import ReactDOM  from 'react-dom';

import App from './views/app';
import AppRouter from './routes'

ReactDOM.render(
    <App><AppRouter></AppRouter></App>,
    document.getElementById('app')
  );
